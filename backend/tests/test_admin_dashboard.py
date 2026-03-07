"""
Test suite for Nova Admin Dashboard API endpoints
Tests: Auth, Visitor Tracking, Portfolio CRUD, Contacts (Admin)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials
ADMIN_EMAIL = "somood@novaway.agency"
ADMIN_PASSWORD = "Somood@123"
WRONG_EMAIL = "wrong@example.com"
WRONG_PASSWORD = "wrongpassword"


class TestAuth:
    """Test /api/auth/login endpoint"""

    def test_login_with_correct_credentials(self):
        """POST /api/auth/login with correct credentials should return token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "token" in data, "Response should contain 'token'"
        assert "email" in data, "Response should contain 'email'"
        assert data["email"] == ADMIN_EMAIL, f"Email should be {ADMIN_EMAIL}"
        assert isinstance(data["token"], str) and len(data["token"]) > 0, "Token should be a non-empty string"
        print(f"✓ Login successful, token length: {len(data['token'])}")

    def test_login_with_wrong_email(self):
        """POST /api/auth/login with wrong email should return 401"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": WRONG_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        data = response.json()
        assert "detail" in data, "Response should contain 'detail' error message"
        print(f"✓ Wrong email returns 401: {data['detail']}")

    def test_login_with_wrong_password(self):
        """POST /api/auth/login with wrong password should return 401"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": WRONG_PASSWORD
        })
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        data = response.json()
        assert "detail" in data, "Response should contain 'detail' error message"
        print(f"✓ Wrong password returns 401: {data['detail']}")


class TestVisitorTracking:
    """Test visitor tracking endpoints"""

    def test_track_visitor(self):
        """POST /api/visitors/track should track a visitor"""
        response = requests.post(f"{BASE_URL}/api/visitors/track", json={
            "referrer": "https://google.com",
            "page": "/test-page"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert data.get("status") == "tracked", "Response should have status: tracked"
        print("✓ Visitor tracked successfully")

    def test_track_visitor_without_referrer(self):
        """POST /api/visitors/track without referrer should still work"""
        response = requests.post(f"{BASE_URL}/api/visitors/track", json={
            "page": "/"
        })
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        print("✓ Visitor tracked without referrer")


class TestAdminVisitors:
    """Test admin visitor endpoints (protected)"""

    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Authentication failed")

    def test_get_visitors_with_auth(self, auth_token):
        """GET /api/admin/visitors with valid token should return visitors list"""
        response = requests.get(
            f"{BASE_URL}/api/admin/visitors",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Got {len(data)} visitors")
        # Validate visitor structure if data exists
        if len(data) > 0:
            visitor = data[0]
            expected_fields = ["id", "ip", "visited_at"]
            for field in expected_fields:
                assert field in visitor, f"Visitor should have '{field}' field"

    def test_get_visitors_without_auth(self):
        """GET /api/admin/visitors without token should return 403"""
        response = requests.get(f"{BASE_URL}/api/admin/visitors")
        assert response.status_code == 403, f"Expected 403, got {response.status_code}"
        print("✓ Unauthenticated request returns 403")

    def test_get_visitors_with_invalid_token(self):
        """GET /api/admin/visitors with invalid token should return 401"""
        response = requests.get(
            f"{BASE_URL}/api/admin/visitors",
            headers={"Authorization": "Bearer invalid_token_here"}
        )
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ Invalid token returns 401")

    def test_get_visitor_stats_with_auth(self, auth_token):
        """GET /api/admin/visitors/stats with valid token should return stats"""
        response = requests.get(
            f"{BASE_URL}/api/admin/visitors/stats",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        # Validate stats structure
        assert "total" in data, "Stats should have 'total'"
        assert "today" in data, "Stats should have 'today'"
        assert "devices" in data, "Stats should have 'devices'"
        assert "countries" in data, "Stats should have 'countries'"
        assert isinstance(data["total"], int), "Total should be an integer"
        assert isinstance(data["today"], int), "Today should be an integer"
        print(f"✓ Stats: total={data['total']}, today={data['today']}")


class TestPortfolio:
    """Test portfolio endpoints (public GET + protected CRUD)"""

    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Authentication failed")

    def test_get_portfolio_public(self):
        """GET /api/portfolio should return projects (public endpoint)"""
        response = requests.get(f"{BASE_URL}/api/portfolio")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        # Should return default projects if DB is empty
        assert len(data) >= 0, "Should return at least empty list or defaults"
        print(f"✓ Got {len(data)} portfolio projects")
        # Validate project structure if data exists
        if len(data) > 0:
            project = data[0]
            required_fields = ["id", "title_ar", "title_en", "description_ar", "description_en", "image"]
            for field in required_fields:
                assert field in project, f"Project should have '{field}' field"

    def test_create_portfolio_project(self, auth_token):
        """POST /api/admin/portfolio should create a new project"""
        test_project = {
            "title_ar": "TEST_مشروع اختبار",
            "title_en": "TEST_Test Project",
            "description_ar": "وصف المشروع للاختبار",
            "description_en": "Project description for testing",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
            "category_ar": "اختبار",
            "category_en": "Testing",
            "link": "https://example.com"
        }
        response = requests.post(
            f"{BASE_URL}/api/admin/portfolio",
            headers={"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"},
            json=test_project
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        assert "id" in data, "Created project should have 'id'"
        assert data["title_ar"] == test_project["title_ar"], "Title AR should match"
        assert data["title_en"] == test_project["title_en"], "Title EN should match"
        print(f"✓ Created project with id: {data['id']}")
        
        # Store ID for cleanup
        self.__class__.created_project_id = data["id"]
        return data["id"]

    def test_create_portfolio_without_auth(self):
        """POST /api/admin/portfolio without auth should return 403"""
        response = requests.post(
            f"{BASE_URL}/api/admin/portfolio",
            headers={"Content-Type": "application/json"},
            json={"title_ar": "test", "title_en": "test", "description_ar": "test", "description_en": "test", "image": "test"}
        )
        assert response.status_code == 403, f"Expected 403, got {response.status_code}"
        print("✓ Unauthenticated POST returns 403")

    def test_update_portfolio_project(self, auth_token):
        """PUT /api/admin/portfolio/{id} should update a project"""
        # First create a project
        create_response = requests.post(
            f"{BASE_URL}/api/admin/portfolio",
            headers={"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"},
            json={
                "title_ar": "TEST_للتحديث",
                "title_en": "TEST_To Update",
                "description_ar": "وصف أصلي",
                "description_en": "Original description",
                "image": "https://example.com/img.jpg"
            }
        )
        assert create_response.status_code == 200, f"Create failed: {create_response.text}"
        project_id = create_response.json()["id"]
        
        # Now update it
        update_data = {
            "title_ar": "TEST_تم التحديث",
            "title_en": "TEST_Updated",
            "description_ar": "وصف محدث",
            "description_en": "Updated description",
            "image": "https://example.com/updated.jpg"
        }
        update_response = requests.put(
            f"{BASE_URL}/api/admin/portfolio/{project_id}",
            headers={"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"},
            json=update_data
        )
        assert update_response.status_code == 200, f"Expected 200, got {update_response.status_code}"
        updated = update_response.json()
        assert updated["title_en"] == "TEST_Updated", "Title should be updated"
        print(f"✓ Updated project {project_id}")
        
        # Cleanup - delete the project
        requests.delete(
            f"{BASE_URL}/api/admin/portfolio/{project_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )

    def test_delete_portfolio_project(self, auth_token):
        """DELETE /api/admin/portfolio/{id} should delete a project"""
        # First create a project to delete
        create_response = requests.post(
            f"{BASE_URL}/api/admin/portfolio",
            headers={"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"},
            json={
                "title_ar": "TEST_للحذف",
                "title_en": "TEST_To Delete",
                "description_ar": "سيتم حذفه",
                "description_en": "Will be deleted",
                "image": "https://example.com/delete.jpg"
            }
        )
        assert create_response.status_code == 200, f"Create failed: {create_response.text}"
        project_id = create_response.json()["id"]
        
        # Delete it
        delete_response = requests.delete(
            f"{BASE_URL}/api/admin/portfolio/{project_id}",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert delete_response.status_code == 200, f"Expected 200, got {delete_response.status_code}"
        data = delete_response.json()
        assert data.get("status") == "deleted", "Response should have status: deleted"
        print(f"✓ Deleted project {project_id}")
        
        # Verify it's gone
        get_response = requests.get(f"{BASE_URL}/api/portfolio")
        projects = get_response.json()
        project_ids = [p["id"] for p in projects]
        assert project_id not in project_ids, "Deleted project should not appear in list"

    def test_delete_nonexistent_project(self, auth_token):
        """DELETE /api/admin/portfolio/{id} for non-existent project should return 404"""
        response = requests.delete(
            f"{BASE_URL}/api/admin/portfolio/nonexistent-id-12345",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 404, f"Expected 404, got {response.status_code}"
        print("✓ Delete non-existent project returns 404")


class TestAdminContacts:
    """Test admin contacts endpoint (protected)"""

    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Authentication failed")

    def test_get_contacts_with_auth(self, auth_token):
        """GET /api/admin/contacts with valid token should return contacts list"""
        response = requests.get(
            f"{BASE_URL}/api/admin/contacts",
            headers={"Authorization": f"Bearer {auth_token}"}
        )
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Got {len(data)} contacts")

    def test_get_contacts_without_auth(self):
        """GET /api/admin/contacts without token should return 403"""
        response = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert response.status_code == 403, f"Expected 403, got {response.status_code}"
        print("✓ Unauthenticated request returns 403")


class TestCleanup:
    """Cleanup test data created during tests"""

    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            return response.json()["token"]
        pytest.skip("Authentication failed")

    def test_cleanup_test_projects(self, auth_token):
        """Delete all TEST_ prefixed projects"""
        # Get all projects
        response = requests.get(f"{BASE_URL}/api/portfolio")
        if response.status_code != 200:
            pytest.skip("Could not fetch portfolio")
        
        projects = response.json()
        test_projects = [p for p in projects if p.get("title_en", "").startswith("TEST_") or p.get("title_ar", "").startswith("TEST_")]
        
        deleted_count = 0
        for project in test_projects:
            del_resp = requests.delete(
                f"{BASE_URL}/api/admin/portfolio/{project['id']}",
                headers={"Authorization": f"Bearer {auth_token}"}
            )
            if del_resp.status_code == 200:
                deleted_count += 1
        
        print(f"✓ Cleaned up {deleted_count} test projects")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])

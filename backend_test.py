import requests
import sys
import json
from datetime import datetime

class NovaAPITester:
    def __init__(self, base_url="https://agency-hub-148.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = {}

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api{endpoint}"
        if not headers:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
                self.results[name] = {"status": "PASS", "response": response.json() if response.text else {}}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}...")
                self.results[name] = {"status": "FAIL", "error": f"Expected {expected_status}, got {response.status_code}"}

            return success, response.json() if response.text and 'json' in response.headers.get('content-type', '') else {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            self.results[name] = {"status": "ERROR", "error": str(e)}
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results[name] = {"status": "ERROR", "error": str(e)}
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "/", 200)

    def test_services_endpoint(self):
        """Test services endpoint"""
        return self.run_test("Get Services", "GET", "/services", 200)

    def test_team_endpoint(self):
        """Test team endpoint"""
        return self.run_test("Get Team", "GET", "/team", 200)

    def test_projects_endpoint(self):
        """Test projects/portfolio endpoint"""
        return self.run_test("Get Projects", "GET", "/projects", 200)

    def test_contacts_endpoint(self):
        """Test get contacts endpoint"""
        return self.run_test("Get Contacts", "GET", "/contacts", 200)

    def test_contact_submission(self):
        """Test contact form submission"""
        test_contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+970599000000",
            "service": "portfolio",
            "message": "This is a test message for Nova digital agency"
        }
        
        success, response = self.run_test("Submit Contact", "POST", "/contact", 200, test_contact_data)
        if success and response:
            contact_id = response.get('id')
            if contact_id:
                print(f"   Contact ID: {contact_id}")
                return True, contact_id
        return False, None

    def test_status_check_post(self):
        """Test status check creation"""
        test_data = {
            "client_name": "Test Client"
        }
        return self.run_test("Create Status Check", "POST", "/status", 200, test_data)

    def test_status_check_get(self):
        """Test status check retrieval"""
        return self.run_test("Get Status Checks", "GET", "/status", 200)

def main():
    print("🚀 Starting Nova Digital Agency API Tests")
    print("=" * 50)
    
    tester = NovaAPITester()
    
    # Test all endpoints
    print("\n📡 Testing Core API Endpoints...")
    tester.test_root_endpoint()
    
    print("\n📋 Testing Data Endpoints...")
    tester.test_services_endpoint()
    tester.test_team_endpoint()
    tester.test_projects_endpoint()
    tester.test_contacts_endpoint()
    
    print("\n📝 Testing Status Check Functionality...")
    tester.test_status_check_post()
    tester.test_status_check_get()
    
    print("\n📧 Testing Contact Form Submission...")
    success, contact_id = tester.test_contact_submission()
    
    # Print final results
    print("\n" + "=" * 50)
    print("📊 TEST RESULTS SUMMARY")
    print("=" * 50)
    print(f"Total Tests: {tester.tests_run}")
    print(f"Passed: {tester.tests_passed}")
    print(f"Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed / tester.tests_run * 100):.1f}%")
    
    print("\n📋 Detailed Results:")
    for test_name, result in tester.results.items():
        status = result['status']
        if status == "PASS":
            print(f"✅ {test_name}")
        elif status == "FAIL":
            print(f"❌ {test_name} - {result.get('error', 'Unknown error')}")
        else:
            print(f"⚠️  {test_name} - {result.get('error', 'Unknown error')}")
    
    # Return exit code based on test results
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
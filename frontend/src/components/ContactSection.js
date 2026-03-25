const ContactSection = () => {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* 1. هذا هو جزء الفورم المعدل */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900">تواصل معنا</h2>
            
            {/* التعديل هنا: إضافة action و method */}
            <form 
              action="https://formspree.io/f/xdapnqgo" 
              method="POST"
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                <input
                  type="text"
                  name="name" /* ضروري جداً لإرسال البيانات */
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="اسمك الكريم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email" /* ضروري جداً لإرسال البيانات */
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                <textarea
                  name="message" /* ضروري جداً لإرسال البيانات */
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="كيف بقدر أساعدك؟"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
              >
                إرسال الرسالة
              </button>
            </form>
          </motion.div>

          {/* 2. هذا هو جزء الخريطة الذي أرسلتِه أنتِ */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900">موقعنا</h3>
              <p className="text-gray-600">الخليل، فلسطين</p>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.871274534725!2d35.0998!3d31.5297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502e6e3445885f9%3A0x6a05e55e0500!2sHebron!5e0!3m2!1sen!2sps!4v1614123456789"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nova Location"
                className="hover:opacity-90 transition-opacity"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

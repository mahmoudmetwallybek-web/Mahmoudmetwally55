// 1. تهيئة AOS للحركات
AOS.init({
  duration: 600,
  easing: 'ease-out-cubic',
  once: true, // يفضل true عشان الأداء وعشان العنصر ميفضلش يختفي ويظهر
  offset: 140,
  disable: window.innerWidth < 768 ? 'mobile' : false
});

// 2. إدارة إغلاق بنر التحديثات
document.getElementById('close-banner')?.addEventListener('click', function() {
  document.getElementById('update-banner').style.display = 'none';
});

// 3. منطق العد التنازلي (أسبوعين من اللحظة الحالية)
const countdownDate = new Date().getTime() + (14 * 24 * 60 * 60 * 1000); 

function updateAllCounters() {
  const now = new Date().getTime();
  const diff = countdownDate - now;

  // لو العرض انتهى
  if (diff <= 0) {
    clearInterval(timerInterval);
    const elementsToUpdate = ["countdown", "modal-countdown"];
    elementsToUpdate.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = "<h3 style='color:var(--accent2)'>انتهى العرض!</h3>";
    });
    return;
  }

  // حساب الأيام والساعات والدقائق والثواني
  const d = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

  // تحديث عداد الصفحة الأساسي
  const updateIfExits = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  };

  updateIfExits("days", d);
  updateIfExits("hours", h);
  updateIfExits("minutes", m);
  updateIfExits("seconds", s);

  // تحديث عداد الـ Pop-up (النافذة المنبثقة)
  updateIfExits("modal-days", d);
  updateIfExits("modal-hours", h);
  updateIfExits("modal-mins", m);
  updateIfExits("modal-secs", s); // أضفت دي عشان الثواني تتحرك في الـ Pop-up كمان
}

// تشغيل العداد كل ثانية
const timerInterval = setInterval(updateAllCounters, 1000);
updateAllCounters(); // تشغيل فوري

// 4. نظام الـ Pop-up (النافذة المنبثقة)
window.addEventListener('load', () => {
  setTimeout(() => {
    const modal = document.getElementById('offer-modal');
    if (modal) modal.style.display = 'block';
  }, 2500);
});

// إغلاق الـ Pop-up عند الضغط على X
const closeBtn = document.querySelector('.close-modal');
if (closeBtn) {
  closeBtn.onclick = function() {
    document.getElementById('offer-modal').style.display = 'none';
  };
}

// إغلاق الـ Pop-up عند الضغط خارج الصندوق
window.onclick = function(event) {
  const modal = document.getElementById('offer-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

console.log("Mahmoud's Portfolio JS Loaded & Synced! 🚀");
document.getElementById('close-banner')?.addEventListener('click', function() {
  document.getElementById('update-banner').style.display = 'none';
});
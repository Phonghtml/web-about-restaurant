// ---------- ข้อมูลเมนู ----------
const dishes = [
  { name: 'ລາບໝູ',          cat: 'main',   emoji: '🍖', price: 35000, desc: 'ລາບໝູສັບ ປຸງດ້ວຍເຂົ້າຄົ່ວ ແລະ ຜັກຫອມ' },
  { name: 'ປີ້ງໄກ່',         cat: 'main',   emoji: '🍗', price: 45000, desc: 'ໄກ່ປີ້ງຖ່ານ ໝັກເຄື່ອງເທດ ກິນກັບແຈ່ວ' },
  { name: 'ເຝີ',            cat: 'main',   emoji: '🍜', price: 30000, desc: 'ເສັ້ນເຝີນ້ຳຊຸບຫອມກະດູກໝູ່' },
  { name: 'ເຂົ້າປຽກເສັ້ນ',    cat: 'main',   emoji: '🍲', price: 30000, desc: 'ເສັ້ນເຮັດເອງ ໜຽວໜຸ້ມລື້ນຄໍ' },
  { name: 'ຕຳໝາກຮຸ່ງ',       cat: 'salad',  emoji: '🥗', price: 25000, desc: 'ຕຳລາວ ລົດເຜັດ ເຄັມ ເປັນເອກະລັກ' },
  { name: 'ຕຳໝາກແຕງ',       cat: 'salad',  emoji: '🥒', price: 25000, desc: 'ຕຳໝາກແຕງສົດຊື່ນ ລົດຈັດຈ້ານ' },
  { name: 'ສະຫຼັດຜັກ',       cat: 'salad',  emoji: '🥬', price: 20000, desc: 'ຜັກສົດຈາກສວນ ຍຳສະຫຼັດ' },
  { name: 'ນ້ຳໝາກນາວ',      cat: 'drink',  emoji: '🍋', price: 15000, desc: 'ນ້ຳໝາກນາວສົດ ແກ້ຮ້ອນ' },
  { name: 'ກາເຟລາວເຢັນ',     cat: 'drink',  emoji: '☕', price: 20000, desc: 'ກາເຟລາວເຂັ້ມ ໃສ່ນົມຂຸ້ນ' },
  { name: 'ຊານົມເຢັນ',       cat: 'drink',  emoji: '🧋', price: 15000, desc: 'ຊານົມເຢັນ ຫວານມັນ' }
];
const categories = [
  { id: 'all',   label: 'ທັງໝົດ' },
  { id: 'main',  label: 'ອາຫານຈານຫຼັກ' },
  { id: 'salad', label: 'ຕຳ ແລະ ສະຫຼັດ' },
  { id: 'drink', label: 'ເຄື່ອງດື່ມ' }
];

// ---------- อ้างอิง element ----------
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const filtersEl = document.getElementById('filters');
const grid = document.getElementById('menuGrid');
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

// ---------- Navigation: มือถือ + เงาตอนเลื่อน ----------
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open);
});
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', false);
  }
});
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ไฮไลต์ลิงก์ตามส่วนที่กำลังดู
const links = navLinks.querySelectorAll('a:not(.btn)');
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => spy.observe(s));

// ---------- Menu: สร้างปุ่มกรอง + การ์ดอาหาร ----------
categories.forEach((c, i) => {
  const b = document.createElement('button');
  b.textContent = c.label;
  b.dataset.cat = c.id;
  if (i === 0) b.classList.add('on');
  filtersEl.appendChild(b);
});

function renderMenu(cat) {
  grid.innerHTML = '';
  dishes.filter(d => cat === 'all' || d.cat === cat).forEach((d, i) => {
    const card = document.createElement('article');
    card.className = 'dish';
    card.style.animationDelay = i * 60 + 'ms';
    card.innerHTML = `
      <div class="emoji">${d.emoji}</div>
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <span class="price">${d.price.toLocaleString('en-US')} ກີບ</span>`;
    grid.appendChild(card);
  });
}
filtersEl.addEventListener('click', e => {
  if (!e.target.dataset.cat) return;
  filtersEl.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.target));
  renderMenu(e.target.dataset.cat);
});
renderMenu('all');

// ---------- Contact: ตรวจสอบฟอร์ม ----------
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  [name, phone].forEach(i => i.classList.toggle('error', i.value.trim() === ''));

  if (name.value.trim() === '' || phone.value.trim() === '') {
    formMsg.textContent = '⚠️ ກະລຸນາຕື່ມຊື່ ແລະ ເບີໂທລະສັບ';
    formMsg.style.color = '#ef4444';
  } else {
    formMsg.textContent = '✅ ຂອບໃຈ! ພວກເຮົາຈະຕິດຕໍ່ກັບໄປໄວໆນີ້';
    formMsg.style.color = '#10b981';
    form.reset();
  }
});

// ---------- Scroll reveal + ปีท้ายเว็บ ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
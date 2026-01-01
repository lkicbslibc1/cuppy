// ----------------------
// Bakery menu data
// ----------------------
const bakeryMenu = [
    { id: 1, name: 'Sourdough Bread', price: '90 บาท', img: './img/sourdough.png', color: '#FDF0D5', category: 'bread', poppular: 'yes' },
    { id: 2, name: 'Roll Cake', price: '95 บาท', img: './img/chocoRollCake.png', color: '#D8E2DC', category: 'cake', poppular: 'yes' },
    { id: 3, name: 'Choco Muffin', price: '45 บาท', img: './img/muffin2.png', color: '#ECE4DB', category: 'cake', poppular: 'yes' },
    { id: 4, name: 'Brownie', price: '45 บาท', img: './img/Brownie.png', color: '#D8E2DC', category: 'cake', poppular: 'yes' },
    { id: 5, name: 'Original Croissant', price: '45 บาท', img: './img/croissant.png', color: '#FDF0D5', category: 'bread', poppular: 'yes' },
    { id: 6, name: 'Chocolate Chip Cookie', price: '35 บาท', img: './img/chocolatechipcookie.png', color: '#FDF0D5', category: 'cookie', poppular: 'no' },
    { id: 6, name: 'Vanilla Cookie', price: '35 บาท', img: './img/vanillacookie.png', color: '#FDF0D5', category: 'cookie', poppular: 'no' },
    { id: 6, name: 'Banana Bread', price: '45 บาท', img: './img/bananaBread.png', color: '#FDF0D5', category: 'bread', poppular: 'no' }

];

// ----------------------
// แยกเมนูยอดนิยม vs เมนูทั่วไป
// ----------------------
const popularMenu = bakeryMenu.filter(item => item.poppular === "yes");
const normalMenu = bakeryMenu.filter(item => item.poppular !== "yes");

// ----------------------
// Carousel (เฉพาะ popular)
// ----------------------
let currentIndex = 0;
const carousel = document.getElementById("product-carousel");

// ให้ index หมุนไปเรื่อยๆ ไม่หลุด array
const getIndex = (i) => (i + popularMenu.length) % popularMenu.length;

// อัปเดต carousel
function updateCarousel() {
    const isMobile = window.innerWidth <= 1024;

    const displayItems = isMobile
        ? popularMenu
        : [
            popularMenu[getIndex(currentIndex - 2)],
            popularMenu[getIndex(currentIndex - 1)],
            popularMenu[getIndex(currentIndex)],
            popularMenu[getIndex(currentIndex + 1)],
            popularMenu[getIndex(currentIndex + 2)],
        ];

    carousel.innerHTML = "";

    displayItems.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = isMobile
            ? "product-card"
            : `product-card ${idx >= 1 && idx <= 3 ? "center" : "side"}`;
        card.style.backgroundColor = item.color;

        card.innerHTML = `
            <div class="img-wrapper">
                <img src="${item.img}" alt="${item.name}">
            </div>
            <h3>${item.name}</h3>
            <p class="btn-order">${item.price}</p>
        `;
        carousel.appendChild(card);
    });
}

// ปุ่ม next / prev
function nextSlide() {
    currentIndex = getIndex(currentIndex + 1);
    updateCarousel();
}

function prevSlide() {
    currentIndex = getIndex(currentIndex - 1);
    updateCarousel();
}

window.addEventListener('resize', updateCarousel);
updateCarousel(); // เรียกครั้งแรก


const grid = document.getElementById('all-products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function displayProducts(category) {
    const filtered = category === 'all'
        ? bakeryMenu
        : bakeryMenu.filter(item => item.category === category);

    grid.innerHTML = filtered.map((item, index) => {
        // เพิ่มค่า delay โดยคำนวณจากลำดับ (index) 
        // ใบแรก delay 0, ใบที่สอง 100ms, ใบที่สาม 200ms ไปเรื่อยๆ
        const delay = index * 100;

        return `
            <div class="all-item-card" 
                 data-aos="flip-left" 
                 data-aos-delay="${delay}" 
                 data-aos-duration="800">
                <img src="${item.img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <button class="btn-order" style="font-size: 0.8rem; padding: 5px 15px;">${item.price}</button>
            </div>
        `;
    }).join('');

    // สำคัญมาก: ต้องเรียก AOS.refresh() ทุกครั้งที่ HTML ถูกเปลี่ยนใหม่
    // เพื่อให้ Library รู้จัก Element ที่เพิ่งสร้างขึ้นมา
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ปุ่ม filter
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayProducts(btn.dataset.category);
    });
});

// โหลดเริ่มต้น
displayProducts('all');


// ----------------------
// toggle เมนูมือถือ
// ----------------------
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

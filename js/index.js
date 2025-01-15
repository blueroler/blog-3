show_hots();
show_list();
updateBox2Height();
show_politics();
show_shows();
show_sport();
show_tech();

///////////////////////////////////////////////////////////////////////////////

const count_sub_post = 8; // lấy số lượng bài viết trong phần sub 

///////////////////////////////////////////////////////////////////////////////////
function updateBox2Height() {
  const box1 = document.querySelector('.calc-hots');
  const box2 = document.querySelector('.calc-list');
  box2.style.height = `${box1.offsetHeight}px`;
}

const observer = new ResizeObserver(updateBox2Height);
observer.observe(document.querySelector('.calc-hots'));

///////////////////////////////////////////////////////////////////////////////

function show_hots() {
  const show_hots = document.getElementById('hots-section');
  show_hots.innerHTML = `
    <h2>Breaking News</h2>
    <div class="calc-hots" id="get-data-hots"></div>`;
  hots();
}

async function hots() {
  let count = 0;
  const response = await fetch(`${databaseUrl}/news.json`);
  const news = await response.json();
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  newsArray.sort((a, b) => b.timestamp - a.timestamp);

  const container = document.getElementById('get-data-hots');
  container.innerHTML = '';

  let contentHTML = '';
  for (let article of newsArray) {
    if (count >= 6) break;
    if (article.topic == 'hots' && article.status == 'public') {
      contentHTML += `
        <a href="posts.html?topic=${article.topic}&id=${article.id}" class="news-item")">
          <div class="hots-news-item">
            <div class="hots-news-img skeleton-active">
              <img src="${article.summary}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="hots-news-text">
              <div>
                <h4 style="display: inline-block;">${article.name}</h4>
              </div>
            </div>
          </div>
        </a>
        `;
      count++;
    }
  }
  contentHTML += '<div class="see-more"> <a href="posts.html?topic=hots&id=null">See more</a></div>';
  container.innerHTML = contentHTML;

}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function show_list() {
  const show_list = document.getElementById('list-section');
  show_list.innerHTML = `
    <h2>Latest News</h2>
    <div class="calc-list" id="get-data-list"></div>`;
  list();
}

async function list() {
  const response = await fetch(`${databaseUrl}/news.json`);
  const news = await response.json();
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  newsArray.sort((a, b) => b.timestamp - a.timestamp);

  const container = document.getElementById('get-data-list');
  container.innerHTML = '';

  let contentHTML = '';
  for (let article of newsArray) {
    if (article.topic !== 'hots' && article.status !== 'hide') {
      contentHTML += `
        <a href="posts.html?topic=${article.topic}&id=${article.id}" class="news-item")">
          <div class="list-news-item">
            <div class="list-news-img skeleton-active">
              <img src="${article.summary}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="list-news-text">
              <div>
                <h4 style="display: inline-block;">${article.name}</h4>
              </div>
              <small>${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
          </div>
        </a>
      `;
    }
  }
  container.innerHTML = contentHTML;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////

function show_politics() {
  const show_politics = document.getElementById('politics-section');
  show_politics.innerHTML = `
    <div class="section-title">
      <h2>Tin Chính Trị</h2>
      <div class="carousel-buttons">
        <button class="carousel-button left" onclick="moveCarousel_politics(-1)">&#10094;</button>
        <button class="carousel-button right" onclick="moveCarousel_politics(1)">&#10095;</button>
      </div>
    </div>
    <div class="carousel-container">
      <div class="carousel" id="politics-carousel"></div>
    </div>`;
  politics();
}

const carousel_politics = document.getElementById('politics-carousel'); // Lấy phần tử băng chuyền
let currentIndex_politics = 0; // Chỉ số hiện tại của băng chuyền

// Hàm dịch chuyển băng chuyền
function moveCarousel_politics(direction) {
  const itemsVisible = 4; // Số mục hiển thị cùng lúc
  const totalItems = document.querySelectorAll('.politics-carousel-item').length; // Tổng số mục trong băng chuyền

  currentIndex_politics += direction; // Cập nhật chỉ số theo hướng di chuyển

  // Đảm bảo chỉ số không vượt quá giới hạn
  if (currentIndex_politics < 0) {
    currentIndex_politics = 0;
  } else if (currentIndex_politics > totalItems - itemsVisible) {
    currentIndex_politics = totalItems - itemsVisible;
  }

  const offset = currentIndex_politics * -25; // Tính toán khoảng cách dịch chuyển (25% mỗi mục)
  carousel_politics.style.transform = `translateX(${offset}%)`; // Áp dụng dịch chuyển cho băng chuyền
}

// Hàm lấy dữ liệu bài viết từ database và hiển thị
async function politics() {
  let count = 0; // Bộ đếm số bài viết được thêm
  const response = await fetch(`${databaseUrl}/news.json`); // Gửi yêu cầu lấy dữ liệu từ database
  const news = await response.json(); // Chuyển đổi phản hồi JSON thành object
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  })); // Chuyển object thành mảng để dễ xử lý

  newsArray.sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp bài viết theo thời gian giảm dần

  let contentHTML = ''; // Chuỗi chứa nội dung HTML

  for (let article of newsArray) {
    if (count >= count_sub_post) break; // Chỉ lấy tối đa số bài viết cho phép

    // Chỉ lấy các bài viết thuộc chủ đề chính trị và công khai
    if (article.topic === 'politics' && article.status === 'public') {
      contentHTML += `
        <a href="posts.html?topic=${article.topic}&id=${article.id}" class="politics-carousel-item carousel-item")">
          <div class="cursor-item">
            <div class="section-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="section-text">
              <div>
                <h4>${article.name}</h4>
              </div>
              <small>${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
          </div>
        </a>
      `;
      count++; // Tăng bộ đếm
    }
  }

  carousel_politics.innerHTML = contentHTML; // Gán nội dung HTML một lần
}


//////////////////////////////////////////////////////////////////////////////////

function show_shows() {
  const show_shows = document.getElementById('shows-section');
  show_shows.innerHTML = `
    <div class="section-title">
      <h2>Tin giải trí </h2>
      <div class="carousel-buttons">
        <button class="carousel-button left" onclick="moveCarousel_shows(-1)">&#10094;</button>
        <button class="carousel-button right" onclick="moveCarousel_shows(1)">&#10095;</button>
      </div>
    </div>
    <div class="carousel-container">
      <div class="carousel" id="shows-carousel"></div>
    </div>`;
  shows();
}

const carousel_shows = document.getElementById('shows-carousel'); // Lấy phần tử băng chuyền
let currentIndex_shows = 0; // Chỉ số hiện tại của băng chuyền

// Hàm dịch chuyển băng chuyền
function moveCarousel_shows(direction) {
  const itemsVisible = 4; // Số mục hiển thị cùng lúc
  const totalItems = document.querySelectorAll('.shows-carousel-item').length; // Tổng số mục trong băng chuyền

  currentIndex_shows += direction; // Cập nhật chỉ số theo hướng di chuyển

  // Đảm bảo chỉ số không vượt quá giới hạn
  if (currentIndex_shows < 0) {
    currentIndex_shows = 0;
  } else if (currentIndex_shows > totalItems - itemsVisible) {
    currentIndex_shows = totalItems - itemsVisible;
  }

  const offset = currentIndex_shows * -25; // Tính toán khoảng cách dịch chuyển (25% mỗi mục)
  carousel_shows.style.transform = `translateX(${offset}%)`; // Áp dụng dịch chuyển cho băng chuyền
}

// Hàm lấy dữ liệu bài viết từ database và hiển thị

async function shows() {
  let count = 0; // Bộ đếm số bài viết được thêm
  const response = await fetch(`${databaseUrl}/news.json`); // Gửi yêu cầu lấy dữ liệu từ database
  const news = await response.json(); // Chuyển đổi phản hồi JSON thành object
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  })); // Chuyển object thành mảng để dễ xử lý

  newsArray.sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp bài viết theo thời gian giảm dần

  let contentHTML = ''; // Chuỗi chứa nội dung HTML

  for (let article of newsArray) {
    if (count >= count_sub_post) break; // Chỉ lấy tối đa số bài viết cho phép

    // Chỉ lấy các bài viết thuộc chủ đề shows và công khai
    if (article.topic === 'shows' && article.status === 'public') {
      contentHTML += `
        <a href="posts.html?topic=${article.topic}&id=${article.id}" class="shows-carousel-item carousel-item")">
          <div class="cursor-item">
            <div class="section-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="section-text">
              <div>
                <h4>${article.name}</h4>
              </div>
              <small>${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
          </div>
        </a>
      `;
      count++; // Tăng bộ đếm
    }
  }

  carousel_shows.innerHTML = contentHTML; // Gán nội dung HTML một lần
}


///////////////////////////////////////////////////////////////////////////////////////

function show_sport() {
  const show_sport = document.getElementById('sport-section');
  show_sport.innerHTML = `
    <div class="section-title">
      <h2>Tin thể thao </h2>
      <div class="carousel-buttons">
        <button class="carousel-button left" onclick="moveCarousel_sport(-1)">&#10094;</button>
        <button class="carousel-button right" onclick="moveCarousel_sport(1)">&#10095;</button>
      </div>
    </div>
    <div class="carousel-container">
      <div class="carousel" id="sport-carousel"></div>
    </div>`;
  sport();
}

const carousel_sport = document.getElementById('sport-carousel'); // Lấy phần tử băng chuyền
let currentIndex_sport = 0; // Chỉ số hiện tại của băng chuyền

// Hàm dịch chuyển băng chuyền
function moveCarousel_sport(direction) {
  const itemsVisible = 4; // Số mục hiển thị cùng lúc
  const totalItems = document.querySelectorAll('.sport-carousel-item').length; // Tổng số mục trong băng chuyền

  currentIndex_sport += direction; // Cập nhật chỉ số theo hướng di chuyển

  // Đảm bảo chỉ số không vượt quá giới hạn
  if (currentIndex_sport < 0) {
    currentIndex_sport = 0;
  } else if (currentIndex_sport > totalItems - itemsVisible) {
    currentIndex_sport = totalItems - itemsVisible;
  }

  const offset = currentIndex_sport * -25; // Tính toán khoảng cách dịch chuyển (25% mỗi mục)
  carousel_sport.style.transform = `translateX(${offset}%)`; // Áp dụng dịch chuyển cho băng chuyền
}

// Hàm lấy dữ liệu bài viết từ database và hiển thị

async function sport() {
  let count = 0; // Bộ đếm số bài viết được thêm
  const response = await fetch(`${databaseUrl}/news.json`); // Gửi yêu cầu lấy dữ liệu từ database
  const news = await response.json(); // Chuyển đổi phản hồi JSON thành object
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  })); // Chuyển object thành mảng để dễ xử lý

  newsArray.sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp bài viết theo thời gian giảm dần

  let contentHTML = ''; // Chuỗi chứa nội dung HTML

  for (let article of newsArray) {
    if (count >= count_sub_post) break; // Chỉ lấy tối đa số bài viết cho phép

    // Chỉ lấy các bài viết thuộc chủ đề sport và công khai
    if (article.topic === 'sport' && article.status === 'public') {
      contentHTML += `
        <a href="posts.html?topic=${article.topic}&id=${article.id}" class="sport-carousel-item carousel-item")">
          <div class="cursor-item">
            <div class="section-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="section-text">
              <div>
                <h4>${article.name}</h4>
              </div>
              <small>${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
          </div>
        </a>
      `;
      count++; // Tăng bộ đếm
    }
  }

  carousel_sport.innerHTML = contentHTML; // Gán nội dung HTML một lần
}


/////////////////////////////////////////////////////////////////////////////////////

function show_tech() {
  const show_tech = document.getElementById('tech-section');
  show_tech.innerHTML = `
    <div class="section-title">
      <h2>Tin công nghệ </h2>
      <div class="carousel-buttons">
        <button class="carousel-button left" onclick="moveCarousel_tech(-1)">&#10094;</button>
        <button class="carousel-button right" onclick="moveCarousel_tech(1)">&#10095;</button>
      </div>
    </div>
    <div class="carousel-container">
      <div class="carousel" id="tech-carousel"></div>
    </div>`;
  tech();
}

const carousel_tech = document.getElementById('tech-carousel'); // Lấy phần tử băng chuyền
let currentIndex_tech = 0; // Chỉ số hiện tại của băng chuyền

// Hàm dịch chuyển băng chuyền
function moveCarousel_tech(direction) {
  const itemsVisible = 4; // Số mục hiển thị cùng lúc
  const totalItems = document.querySelectorAll('.tech-carousel-item').length; // Tổng số mục trong băng chuyền

  currentIndex_tech += direction; // Cập nhật chỉ số theo hướng di chuyển

  // Đảm bảo chỉ số không vượt quá giới hạn
  if (currentIndex_tech < 0) {
    currentIndex_tech = 0;
  } else if (currentIndex_tech > totalItems - itemsVisible) {
    currentIndex_tech = totalItems - itemsVisible;
  }

  const offset = currentIndex_tech * -25; // Tính toán khoảng cách dịch chuyển (25% mỗi mục)
  carousel_tech.style.transform = `translateX(${offset}%)`; // Áp dụng dịch chuyển cho băng chuyền
}

// Hàm lấy dữ liệu bài viết từ database và hiển thị

async function tech() {
  let count = 0; // Bộ đếm số bài viết được thêm
  const response = await fetch(`${databaseUrl}/news.json`); // Gửi yêu cầu lấy dữ liệu từ database
  const news = await response.json(); // Chuyển đổi phản hồi JSON thành object
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  })); // Chuyển object thành mảng để dễ xử lý

  newsArray.sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp bài viết theo thời gian giảm dần

  let contentHTML = ''; // Chuỗi chứa nội dung HTML

  for (let article of newsArray) {
    if (count >= count_sub_post) break; // Chỉ lấy tối đa số bài viết cho phép

    // Chỉ lấy các bài viết thuộc chủ đề tech và công khai
    if (article.topic === 'tech' && article.status === 'public') {
      contentHTML += `
        <a href="posts.html?topic=${article.topic}&id=${article.id}" class="tech-carousel-item carousel-item")">
          <div class="cursor-item">
            <div class="section-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="section-text">
              <div>
                <h4>${article.name}</h4>
              </div>
              <small>${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
          </div>
        </a>
      `;
      count++; // Tăng bộ đếm
    }
  }

  carousel_tech.innerHTML = contentHTML; // Gán nội dung HTML một lần
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hàm xóa skeleton loader sau khi ảnh tải xong
function removeSkeleton(img) {
  const imgContainer = img.parentElement;
  imgContainer.classList.remove('skeleton-active'); // Xóa skeleton
  img.style.display = 'block'; // Hiển thị ảnh
}

// Hàm xử lý khi ảnh bị lỗi


function handleImageError(img) {
  setTimeout(() => skeleton_error(img), 5000); // delay 5s khi không thể lấy ảnh 
}

function skeleton_error(img) {
  const imgContainer = img.parentElement;
  imgContainer.classList.remove('skeleton-active'); // Xóa skeleton
  img.style.display = 'none'; // Ẩn ảnh bị lỗi

  imgContainer.innerHTML = `
  <div 
    style=" display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #f0f0f0;
    color: #aaa;
    font-size: 14px;
    border-radius: 8px;">
    Image Error
  </div>`;
}

// Lấy phần tử button
const moveToTopBtn = document.getElementById('moveToTop');

// Theo dõi sự kiện cuộn
window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    moveToTopBtn.classList.add('show'); // Hiện nút với hiệu ứng
  } else {
    moveToTopBtn.classList.remove('show'); // Ẩn nút với hiệu ứng
  }
};

// Thêm sự kiện click cho nút
function moveToTop() {
  scrollToTop(500); // Gọi hàm cuộn mượt trong 2 giây
};

// Hàm cuộn lên với animation trong 2 giây
function scrollToTop(duration) {
  const start = document.documentElement.scrollTop || document.body.scrollTop;
  const startTime = Date.now();

  function animateScroll() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime; // Thời gian đã trôi qua
    const progress = Math.min(elapsed / duration, 1); // Tiến độ (tối đa 1)

    // Tính toán vị trí cuộn hiện tại
    const currentScroll = start * (1 - progress);
    document.documentElement.scrollTop = currentScroll;
    document.body.scrollTop = currentScroll;

    // Dừng lại nếu đã hoàn tất
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}


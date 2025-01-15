function lol() {
    clear_main();
    alert('HeHe Tính năng đang phát triển');
}

function clear_main() {
    const clear_dashboard = document.getElementById('admin-dashboard');
    const clear_blogs = document.getElementById('admin-blogs');
    const clear_add_blogs = document.getElementById('admin-add-blogs');
    const admin_ads = document.getElementById('admin-ads');

    clear_dashboard.innerHTML = '';
    clear_blogs.innerHTML = '';
    clear_add_blogs.innerHTML = '';
    admin_ads.innerHTML = ``;
}

admin_dashboard()

function admin_dashboard() {
    clear_main();
    const admin_dashboard = document.getElementById('admin-dashboard');
    admin_dashboard.innerHTML = `
    <h2>Tổng quan bài viết</h2>
    <div class="admin-box">
        <div class="count-box">
            <h3>Tổng</h3>
            <div id="count-total"></div>
        </div>
        <div class="count-box">
            <h3>Đã xuất bản</h3>
            <div id="count-posted"></div>
        </div>
        <div class="count-box">
            <h3>Chưa xuất bản</h3>
            <div id="count-draft"></div>
        </div>
    </div>

    <h2>Theo các chủ đề</h2>
    <div class="admin-box">
        <div class="count-box">
            <h3>Politics</h3>
            <div id="count-politics-post"></div>
        </div>
        <div class="count-box">
            <h3>Shows</h3>
            <div id="count-shows-post"></div>
        </div>
        <div class="count-box">
            <h3>Sport</h3>
            <div id="count-sport-post"></div>
        </div>
        <div class="count-box">
            <h3>Politics</h3>
            <div id="count-politics-post"></div>
        </div>
        <div class="count-box">
            <h3>Shows</h3>
            <div id="count-shows-post"></div>
        </div>
        <div class="count-box">
            <h3>Sport</h3>
            <div id="count-sport-post"></div>
        </div>
    </div>
    `;
    count_total();
}
async function count_total() {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const count_total = document.getElementById('count-total');
    for (let post of postsArray) {
        count1++;
    }
    count_total.innerHTML = `<h4>${count1}</h4>`;

    const count_posted = document.getElementById('count-posted');
    for (let post of postsArray) {
        if (post.status == "public") {
            count2++;
        } else { }

    }
    count_posted.innerHTML = `<h4>${count2}</h4>`;

    const count_draft = document.getElementById('count-draft');
    for (let post of postsArray) {
        if (post.status == "hide") {
            count3++;
        } else { }

    }
    count_draft.innerHTML = `<h4>${count3}</h4>`;
}

function manager_blogs() {
    clear_main();

    const admin_blogs = document.getElementById('admin-blogs');

    admin_blogs.innerHTML = `
    <table id="blogs-btn">
        <tr>
            <td><a href="#chose1">All</a></td>
            <td><a href="#chose2">hots</a></td>
            <td><a href="#chose3">politics</a></td>
            <td><a href="#chose4">shows</a></td>
            <td><a href="#chose5">sport</a></td>
            <td><a href="#chose6">tech</a></td>
        </tr>
    </table>`;
    admin_blogs.innerHTML += `<div id="chose1"><h2>Tất cả bài viết </h2> <table class="table-list" id="table-blogs"></table></div>`;
    admin_blogs.innerHTML += `<div id="chose2"><h2>Chủ đề hot </h2> <table class="table-list" id="table-blogs-hots"></table></div>`;
    admin_blogs.innerHTML += `<div id="chose3"><h2>Chủ đề politics </h2><table class="table-list" id="table-blogs-politics"></table></div>`;
    admin_blogs.innerHTML += `<div id="chose4"><h2>Chủ đề shows </h2> <table class="table-list" id="table-blogs-shows"></table></div>`;
    admin_blogs.innerHTML += `<div id="chose5"><h2>Chủ đề sport </h2> <table class="table-list" id="table-blogs-sport"></table></div>`;
    admin_blogs.innerHTML += `<div id="chose6"><h2>Chủ đề tech </h2><table class="table-list" id="table-blogs-tech"></table></div>`;
    blogs_list();
    blogs_list_hots();
    blogs_list_politics();
    blogs_list_shows();
    blogs_list_sport();
    blogs_list_tech();
}

async function blogs_list() {
    let count = 1;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('table-blogs');
    listContainer.innerHTML = '';

    let htmlContent = `
                    <tr>
                        <td style="width: 50px; height: 50px;"><h4>STT</h4></td>
                        <td style="min-width: 150px; height: 50px;"><h4>Tên bài viết </h4></td>
                        <td><h4>Chủ đề </h4></td>
                        <td><h4>Thời Gian </h4></td>
                        <td><h4>Trạng thái </h4></td>
                        <td style="min-width: 130px; height: 50px;"><h4>Hành động </h4></td>
                    </tr>
    `;
    for (let post of postsArray) {
        htmlContent += `
                    <tr>
                        <td>${count}</td>
                        <td>${post.name}</td>
                        <td>${post.topic}</td>
                        <td>${new Date(post.timestamp).toLocaleDateString()}</td>
                        <td>${post.status}</td>
                        <td>
                            <button onclick="Edit('${post.id}')">Sửa</button>
                            <button onclick="Delete('${post.id}')">Xóa</button></td>
                    </tr>
    `;
        count++;
    }
    listContainer.innerHTML = htmlContent;
}

async function blogs_list_hots() {
    let count = 1;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('table-blogs-hots');
    listContainer.innerHTML = '';

    let htmlContent = `
                    <tr>
                        <td style="width: 50px; height: 50px;"><h4>STT</h4></td>
                        <td style="min-width: 150px; height: 50px;"><h4>Tên bài viết </h4></td>
                        <td><h4>Thời Gian </h4></td>
                        <td><h4>Trạng thái </h4></td>
                        <td style="min-width: 130px; height: 50px;"><h4>Hành động </h4></td>
                    </tr>
    `;
    for (let post of postsArray) {
        if (post.topic == 'hots') {
            htmlContent += `
                        <tr>
                            <td>${count}</td>
                            <td>${post.name}</td>
                            <td>${new Date(post.timestamp).toLocaleDateString()}</td>
                            <td>${post.status}</td>
                            <td>
                                <button onclick="Edit('${post.id}')">Sửa</button>
                                <button onclick="Delete('${post.id}')">Xóa</button></td>
                        </tr>
        `;
            count++;
        } else { }
    }
    listContainer.innerHTML = htmlContent;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function blogs_list_politics() {
    let count = 1;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('table-blogs-politics');
    listContainer.innerHTML = '';

    let htmlContent = `
                    <tr>
                        <td style="width: 50px; height: 50px;"><h4>STT</h4></td>
                        <td style="min-width: 150px; height: 50px;"><h4>Tên bài viết </h4></td>
                        <td><h4>Thời Gian </h4></td>
                        <td><h4>Trạng thái </h4></td>
                        <td style="min-width: 130px; height: 50px;"><h4>Hành động </h4></td>
                    </tr>
    `;
    for (let post of postsArray) {
        if (post.topic == 'politics') {
            htmlContent += `
                        <tr>
                            <td>${count}</td>
                            <td>${post.name}</td>
                            <td>${new Date(post.timestamp).toLocaleDateString()}</td>
                            <td>${post.status}</td>
                            <td>
                                <button onclick="Edit('${post.id}')">Sửa</button>
                                <button onclick="Delete('${post.id}')">Xóa</button></td>
                        </tr>
                            `;
            count++;
        } else { }
    }
    listContainer.innerHTML = htmlContent;
}
//////////////////////////////////////////////////////////////////////////////////////////////////

async function blogs_list_shows() {
    let count = 1;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('table-blogs-shows');
    listContainer.innerHTML = '';

    let htmlContent = `
                    <tr>
                        <td style="width: 50px; height: 50px;"><h4>STT</h4></td>
                        <td style="min-width: 150px; height: 50px;"><h4>Tên bài viết </h4></td>
                        <td><h4>Thời Gian </h4></td>
                        <td><h4>Trạng thái </h4></td>
                        <td style="min-width: 130px; height: 50px;"><h4>Hành động </h4></td>
                    </tr>
    `;
    for (let post of postsArray) {
        if (post.topic == 'shows') {
            htmlContent += `
                        <tr>
                            <td>${count}</td>
                            <td>${post.name}</td>
                            <td>${new Date(post.timestamp).toLocaleDateString()}</td>
                            <td>${post.status}</td>
                            <td>
                                <button onclick="Edit('${post.id}')">Sửa</button>
                                <button onclick="Delete('${post.id}')">Xóa</button></td>
                        </tr>
                            `;
            count++;
        } else { }
    }
    listContainer.innerHTML = htmlContent;
}
///////////////////////////////////////////////////////////////////////////////////////////////

async function blogs_list_sport() {
    let count = 1;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('table-blogs-sport');
    listContainer.innerHTML = '';

    let htmlContent = `
                    <tr>
                        <td style="width: 50px; height: 50px;"><h4>STT</h4></td>
                        <td style="min-width: 150px; height: 50px;"><h4>Tên bài viết </h4></td>
                        <td><h4>Thời Gian </h4></td>
                        <td><h4>Trạng thái </h4></td>
                        <td style="min-width: 130px; height: 50px;"><h4>Hành động </h4></td>
                    </tr>
    `;
    for (let post of postsArray) {
        if (post.topic == 'sport') {
            htmlContent += `
                        <tr>
                            <td>${count}</td>
                            <td>${post.name}</td>
                            <td>${new Date(post.timestamp).toLocaleDateString()}</td>
                            <td>${post.status}</td>
                            <td>
                                <button onclick="Edit('${post.id}')">Sửa</button>
                                <button onclick="Delete('${post.id}')">Xóa</button></td>
                        </tr>
                            `;
            count++;
        } else { }
    }
    listContainer.innerHTML = htmlContent;
}
///////////////////////////////////////////////////////////////////////////////////////////////////

async function blogs_list_tech() {
    let count = 1;
    const response = await fetch(`${databaseUrl}/news.json`);
    const posts = await response.json();

    const postsArray = Object.entries(posts || {}).map(([id, item]) => ({
        id,
        ...item,
    }));

    postsArray.sort((a, b) => b.timestamp - a.timestamp);

    const listContainer = document.getElementById('table-blogs-tech');
    listContainer.innerHTML = '';

    let htmlContent = `
                    <tr>
                        <td style="width: 50px; height: 50px;"><h4>STT</h4></td>
                        <td style="min-width: 150px; height: 50px;"><h4>Tên bài viết </h4></td>
                        <td><h4>Thời Gian </h4></td>
                        <td><h4>Trạng thái </h4></td>
                        <td style="min-width: 130px; height: 50px;"><h4>Hành động </h4></td>
                    </tr>
    `;
    for (let post of postsArray) {
        if (post.topic == 'tech') {
            htmlContent += `
                        <tr>
                            <td>${count}</td>
                            <td>${post.name}</td>
                            <td>${new Date(post.timestamp).toLocaleDateString()}</td>
                            <td>${post.status}</td>
                            <td>
                                <button onclick="Edit('${post.id}')">Sửa</button>
                                <button onclick="Delete('${post.id}')">Xóa</button></td>
                        </tr>
                            `;
            count++;
        } else { }
    }
    listContainer.innerHTML = htmlContent;
}

function Edit(id) {
    hide_post();
    async function hide_post() {
        const postData = {
            status: 'hide',
        };

        const method = id ? 'PATCH' : 'POST';
        const url = id
            ? `${databaseUrl}/news/${id}.json`
            : `${databaseUrl}/news.json`;

        if (confirm('Nếu bạn sửa bài viết này sẽ chuyển sang dạng ẩn')) {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
            window.location.href = `edit.html?id=${id}`;
            // window.open(`edit.html?id=${id}`, '_blank');
        }
    }
}

async function Delete(id) {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        await fetch(`${databaseUrl}/news/${id}.json`, { method: 'DELETE' });
        manager_blogs();
    }
}

function add_blogs() {
    clear_main();
    const admin_add_blogs = document.getElementById('admin-add-blogs');
    admin_add_blogs.innerHTML = `
    <form id='put-blogs'>
    <input style="display: none;" id="post-id" />
    <div>
      <label for="category">Chủ đề bài viết:</label>
      <input id="get-category" list="category" type="text" required>
      <datalist id="category">
        <option value="politics"></option>
        <option value="shows"></option>
        <option value="sport"></option>
        <option value="tech"></option>
        <option value="hots"></option>
      </datalist>
    </div>

    <div>
      <label for="name">Tên bài viết:</label>
      <input type="text" id="name" required />
    </div>

    <div>
      <label for="summary">Ảnh thumbnail:</label>
      <textarea rows="4" cols="50" id="summary" placeholder="Link ảnh nhúng" required></textarea>
    </div>

    <div class="just-center">
      <button type="submit">Tạo bài viết</button>
      <!-- <button id="addnews" type="button">Tạo bài viết</button> -->
    </div>

  </form>
  `;
    add_Post();
}

function add_Post() {
    document.getElementById('put-blogs').addEventListener('submit', savePost);

    async function savePost(event) {
        event.preventDefault();

        const topic = document.getElementById('get-category').value;
        // const postId = document.getElementById('post-id').value;
        const postId = Date.now();
        const name = document.getElementById('name').value;
        const summary = document.getElementById('summary').value;

        const postData = {
            status: 'public',
            topic,
            name,
            summary,
            timestamp: postId ? Date.now() : Date.now(),
        };

        const method = postId ? 'PUT' : 'POST';
        const url = postId
            ? `${databaseUrl}/news/${postId}.json`
            : `${databaseUrl}/news.json`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });

        document.getElementById('put-blogs').reset();
        manager_blogs();
    }
}

function admin_ads() {
    clear_main();
    const admin_ads = document.getElementById('admin-ads');
    admin_ads.innerHTML = `
    <div class="admin-ads-container">
        <div id="check-ads-status"></div>
        <table>
            <tbody>
            </tbody>
        </table>
        <form id='add-ads'>
            <div>
                <label for="ads-id">Thêm quảng cáo</label>
                <input type="text" id="img-id" placeholder="Img banner" required />
            </div>
            <div>
                <input type="text" id="ads-id" placeholder="ADS link" required>
            </div>
            <div class="just-center">
                <button type="submit">Tạo</button>
            </div>
        </form>
    </div>
    `;
    put_ads();
    check_ads_status();
}

async function check_ads_status() {

    const dataContainer = document.getElementById('check-ads-status');
    const response = await fetch(`${databaseUrl}/status_element.json`);
    const post = await response.json();

    let htmlContent = '';
    if (post.ads == 0) {
        htmlContent = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 30px;">
            <div style="display: inline-block; width: 250px; text-align: center;">ADS đang tắt</div>
            <button style="width: 100px; background-color: #ddd; color: black;" onclick="on_ads()">Bật ADS</button>
        </div>`;
    } else {
        htmlContent = `
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 30px;">
            <div style="display: inline-block; width: 250px; text-align: center;">ADS đang bật</div>
            <button style="width: 100px;" onclick="off_ads()">Tắt ADS</button>
        </div>`;
    }

    dataContainer.innerHTML = htmlContent;

}

async function on_ads() {
    const postData = {
        ads: 1,
    };

    const method = 'PUT';
    const url = `${databaseUrl}/status_element.json`;
    if (confirm('Bạn có chắc chắn muốn BẬT quảng cáo?')) {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        check_ads_status();
    }
}

async function off_ads() {
    const postData = {
        ads: 0,
    };

    const method = 'PUT';
    const url = `${databaseUrl}/status_element.json`;
    if (confirm('Bạn có chắc chắn muốn TẮT quảng cáo?')) {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
        });
        check_ads_status();
    }
}


async function put_ads() {
    document.getElementById('add-ads').addEventListener('submit', saveAds);
    const response = await fetch(`${databaseUrl}/ads.json`);
    const news = await response.json();
    const newsArray = Object.entries(news || {}).map(([id, item]) => ({ id, ...item }));
    newsArray.sort((a, b) => b.timestamp - a.timestamp);

    let htmlData = `
                <tr>
                    <td style="width: 80px;"><h4>Thứ tự</h4></td>
                    <td><h4>Img</h4></td>
                    <td><h4>ADS</h4></td>
                    <td style="width: 170px;"><h4>Hành động</h4></td>
                </tr>
            `;

    newsArray.forEach((item, index) => {
        htmlData += `
                    <tr>
                        <td><p>${index + 1}</p></td>
                        <td><p>${item.img}</p></td>
                        <td>${item.ads}</td>
                        <td>
                            <button onclick="readyForUpdate('${item.id}', this)">Edit</button>
                            <button onclick="moveUp('${item.id}', ${index})">⬆</button>
                            <button onclick="removeMess('${item.id}')">Delete</button>
                            <button onclick="moveDown('${item.id}', ${index})">⬇</button>
                        </td>
                    </tr>
                `;
    });

    document.querySelector('tbody').innerHTML = htmlData;
}

async function moveUp(id, index) {
    const response = await fetch(`${databaseUrl}/ads.json`);
    const news = await response.json();
    const newsArray = Object.entries(news || {}).map(([id, item]) => ({ id, ...item }));
    newsArray.sort((a, b) => b.timestamp - a.timestamp);

    if (index > 0) {
        const currentItem = newsArray[index];
        const prevItem = newsArray[index - 1];

        // Hoán đổi timestamp
        const updates = {
            [`/ads/${currentItem.id}/timestamp`]: prevItem.timestamp,
            [`/ads/${prevItem.id}/timestamp`]: currentItem.timestamp,
        };

        await fetch(`${databaseUrl}/.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });

        put_ads(); // Load lại dữ liệu
    }
}

async function moveDown(id, index) {
    const response = await fetch(`${databaseUrl}/ads.json`);
    const news = await response.json();
    const newsArray = Object.entries(news || {}).map(([id, item]) => ({ id, ...item }));
    newsArray.sort((a, b) => b.timestamp - a.timestamp);

    if (index < newsArray.length - 1) {
        const currentItem = newsArray[index];
        const nextItem = newsArray[index + 1];

        // Hoán đổi timestamp
        const updates = {
            [`/ads/${currentItem.id}/timestamp`]: nextItem.timestamp,
            [`/ads/${nextItem.id}/timestamp`]: currentItem.timestamp,
        };

        await fetch(`${databaseUrl}/.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });

        put_ads(); // Load lại dữ liệu
    }
}

async function saveAds(event) {
    event.preventDefault();
    const data1 = document.getElementById('img-id').value.trim();
    const data2 = document.getElementById('ads-id').value.trim();
    const newAd = {
        img: data1,
        ads: data2,
        timestamp: Date.now(),
    };

    try {
        const response = await fetch(`${databaseUrl}/ads.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAd),
        });

        if (response.ok) {
            alert('Thêm thành công!');
            document.getElementById('add-ads').reset();
            put_ads();
        } else {
            alert('Thêm thất bại.');
        }
    } catch (error) {
        console.error('Lỗi khi thêm dữ liệu:', error);
        alert('Đã xảy ra lỗi khi thêm.');
    }
}

async function removeMess(key) {
    try {
        const response = await fetch(`${databaseUrl}/ads/${key}.json`, { method: 'DELETE' });
        if (response.ok) {
            alert('Xóa thành công!');
            put_ads();
        } else {
            alert('Xóa thất bại.');
        }
    } catch (error) {
        console.error('Lỗi khi xóa dữ liệu:', error);
        alert('Đã xảy ra lỗi khi xóa.');
    }
}

function readyForUpdate(key, elem) {
    const siblingTd = elem.parentElement.parentElement.getElementsByTagName('td');
    for (var i = 1; i < siblingTd.length - 1; i++) {
        siblingTd[i].contentEditable = true;
        siblingTd[i].classList.add('temp-update-class');
    }
    elem.setAttribute('onclick', `updateNow('${key}', this)`);
    elem.innerHTML = 'Send';
}

async function updateNow(key, elem) {
    const contentId = document.querySelectorAll('.temp-update-class');
    const obj = {
        img: contentId[0].textContent.trim(),
        ads: contentId[1].textContent.trim(),
    };

    try {
        const response = await fetch(`${databaseUrl}/ads/${key}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        });

        if (response.ok) {
            contentId.forEach(cell => {
                cell.contentEditable = false;
                cell.classList.remove('temp-update-class');
            });
            elem.setAttribute('onclick', `readyForUpdate('${key}', this)`);
            elem.innerHTML = 'Edit';
            alert('Cập nhật thành công!');
        } else {
            alert('Cập nhật thất bại.');
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu:', error);
        alert('Đã xảy ra lỗi khi cập nhật.');
    }
}
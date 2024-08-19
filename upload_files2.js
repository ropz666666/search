document.addEventListener('DOMContentLoaded', function () {
    const successMessage = document.getElementById('successMessage');
    const closesuccessButton = successMessage.querySelector('.close');

function   resetPage(){
     $('#data-container').empty();
   
}
var isclickreflash=false;
function showAlert(message) {
    // 创建一个简单的提示框
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    
    // 自动隐藏提示框
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    },3000);
}
// Function to fetch and display data
function fetchData() {
    document.getElementById('loadingOverlay').style.display = 'flex';
    loadingSpinner.style.display = 'block';
    fetch('https://aithub.com.cn:5040/managements', { // 替换为实际的API端点
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',  // 发送 JSON 数据
        },
       
    })
    .then(response => response.json())
    .then(data => {
        console.log('数据已发送到后端：', data);
          // 隐藏加载动画
    document.getElementById('loadingOverlay').style.display = 'none';
    loadingSpinner.style.display = 'none';
       resetPage();
       displayData(data);
       isclickreflash=true;
    // 显示提交成功的提示框
     // 提交成功后的逻辑
    
        // 这里可以添加处理成功响应的代码
    })
    .catch(error => {
        showAlert('网络异常!');
        document.getElementById('loadingOverlay').style.display = 'none';
        loadingSpinner.style.display = 'none';
    });
   
}

// Function to display data
function displayData(data) {
    const container = $('#data-container');
    container.empty(); // Clear existing data
    data.data.forEach((item, index) => {
        console.log(item);
        const dataItem = $(`
            <div class="data-item">
                <div><strong>产业:</strong><p>${item.upload_time}</p></div>
                <div><strong>标题:</strong><p>${item.title}</p></div>
                <div><strong>描述:</strong><p>${item.description}</p></div>
                <div><strong>解决方案:</strong><p>${item.solution}</p></div>
                <div><strong>未来展望:</strong><p>${item.future_view}</p></div>
                <div><strong>相关技术:</strong><p>${item.technologies}</p></div>
               <input type="hidden" class="item-index" value="${index}" />
            </div>
        `);
        container.append(dataItem);
    });
}

// Function to submit processed data

function submitData() {
   
    if(isclickreflash===false)
     {   
        showAlert('请先刷新数据'); 
        return 
    } 
    else
    {
        document.getElementById('loadingOverlay').style.display = 'flex';
        loadingSpinner.style.display = 'block';
    fetch('https://aithub.com.cn:5040/managements', { // 替换为实际的API端点
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // 发送 JSON 数据
        },
    
    })
    .then(response => response.json())
    .then(data => {
        console.log('数据已发送到后端：', data);
          // 隐藏加载动画
    successMessage.style.display = 'block';
    document.getElementById('loadingOverlay').style.display = 'none';
    loadingSpinner.style.display = 'none';
       resetPage();
    // 显示提交成功的提示框
     // 提交成功后的逻辑
    
        // 这里可以添加处理成功响应的代码
    })
    .catch(error => {
        showAlert('网络异常!');
        document.getElementById('loadingOverlay').style.display = 'none';
        loadingSpinner.style.display = 'none';
    });
}
}

// Event listeners
$('#refresh-btn').click(fetchData);
$('#submit-btn').click(submitData);
closesuccessButton.addEventListener('click', function() {
    successMessage.style.display = 'none';
});

})

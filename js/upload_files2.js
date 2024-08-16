document.addEventListener('DOMContentLoaded', function () {
const apiUrl = 'your-backend-api-url'; // 替换成你的后端接口
const staticData = [
    {
        sector: "产业: 教育业\n大类: 教育培训相关服务\n小类: 教育辅助服务",
        title: "华中师范大学: 构建“人工智能+教师教育”新体系",
        description: "华中师范大学自2021年起启动人工智能助推教师队伍建设行",
        solution: "教师素养提升问题: 通过信息素养国家标准的研制和教师信息素养",
        future_view: "教师素养提升问题: 通过信息素养国家标准的研制和教师信息素养"
    },
    {
        sector: "产业: 医疗业\n大类: 医疗器械\n小类: 诊断设备",
        title: "某医疗公司: 创新医疗器械技术",
        description: "某医疗公司致力于开发创新医疗器械，提高诊断效率",
        solution: "提升诊断精度: 采用新型传感器技术",
        future_view: "技术突破: 实现更精准的疾病预测和早期诊断"
    }, {    
        sector: "产业: 医疗业\n大类: 医疗器械\n小类: 诊断设备",
        title: "某医疗公司: 创新医疗器械技术",
        description: "某医疗公司致力于开发创新医疗器械，提高诊断效率",
        solution: "提升诊断精度: 采用新型传感器技术",
        future_view: "技术突破: 实现更精准的疾病预测和早期诊断"
    },
    {
        sector: "产业: 医疗业\n大类: 医疗器械\n小类: 诊断设备",
        title: "某医疗公司: 创新医疗器械技术",
        description: "某医疗公司致力于开发创新医疗器械，提高诊断效率",
        solution: "提升诊断精度: 采用新型传感器技术",
        future_view: "技术突破: 实现更精准的疾病预测和早期诊断"
    }
];
// Function to fetch and display data
function fetchData() {
    //动态数据
    // $.ajax({
    //     url: apiUrl,
    //     method: 'GET',
    //     success: function(data) {
    //         displayData(data);
    //     },
    //     error: function() {
    //         alert('数据加载失败');
    //     }
    // });
    //静态数据
    setTimeout(() => {
        displayData(staticData);
    }, 500); // Simulate network delay
}

// Function to display data
function displayData(data) {
    const container = $('#data-container');
    container.empty(); // Clear existing data

    data.forEach((item, index) => {
        const dataItem = $(`
            <div class="data-item">
                <div><strong>产业:</strong><p>${item.sector}</p></div>
                <div><strong>标题:</strong><p>${item.title}</p></div>
                <div><strong>描述:</strong><p>${item.description}</p></div>
                <div><strong>解决方案:</strong><p>${item.solution}</p></div>
                <div><strong>未来展望:</strong><p>${item.future_view}</p></div>
               <input type="hidden" class="item-index" value="${index}" />
            </div>
        `);
        container.append(dataItem);
    });
}

// Function to submit processed data

function submitData() {
    const processedData = [];
    $('.data-item').each(function() {
    const index = $(this).find('.item-index').val();
    const sector = $(this).find('textarea').eq(0).val();
    const title = $(this).find('textarea').eq(1).val();
    const description = $(this).find('textarea').eq(2).val();
    const solution = $(this).find('textarea').eq(3).val();
    const future_view = $(this).find('textarea').eq(4).val();

    processedData.push({
        sector: sector,
        title: title,
        description: description,
        solution: solution,
        future_view: future_view,
        index: index // Include index for reference
    });
       });
 //动态
    // $.ajax({
    //     url: apiUrl,
    //     method: 'POST',
    //     contentType: 'application/json',
    //     data: JSON.stringify(processedData),
    //     success: function() {
    //         alert('数据提交成功');
    //     },
    //     error: function() {
    //         alert('数据提交失败');
    //     }
    // });
    console.log('Processed Data:', processedData);
            alert('数据提交成功（模拟）');
}

// Event listeners
$('#refresh-btn').click(fetchData);
$('#submit-btn').click(submitData);

// Optional: Fetch data initially
fetchData();
})
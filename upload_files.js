// JavaScript 代码来处理单选按钮的逻辑
document.addEventListener('DOMContentLoaded', function () {
    // const optimize_btn=document.getElementById('optimize-btn');
    // const successMessage2 = document.getElementById('successMessage2');
    // const closesuccessButton2 = successMessage2.querySelector('.close');
    // optimize_btn.addEventListener('click', function() {
    //     document.getElementById('loadingOverlay').style.display = 'flex';
    //     loadingSpinner.style.display = 'block';
    //     fetch('http://127.0.0.1:5000/case_submit', { // 替换为实际的API端点
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',  // 发送 JSON 数据
    //         },
    //         body: JSON.stringify({sector: industryValue,division:broadClassValue,subsector:smallClassValue,text: textValue})
    //     })
        
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('数据已发送到后端：', data);
    //           // 隐藏加载动画
    //     document.getElementById('loadingOverlay').style.display = 'none';
    //     loadingSpinner.style.display = 'none';
        
    //     // 显示提交成功的提示框
    //     successMessage2.style.display = 'block';
    //      // 提交成功后的逻辑
    //      resetPage();
    //         // 这里可以添加处理成功响应的代码
    //     })
    //     .catch(error => {
    //         showAlert('分析失败，请检查网络。');
    //         document.getElementById('loadingOverlay').style.display = 'none';
    //         loadingSpinner.style.display = 'none';
    //         // 无论成功与否都隐藏加载动画
          
    //     });
    


    // })
    // closesuccessButton2.addEventListener('click', function() {
    //     successMessage2.style.display = 'none';
    // });
    // 获取所有单选按钮
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    // 初始化选中第一个单选按钮
    radioButtons[0].checked = true;

    // 监听单选按钮的变化
    radioButtons.forEach(function (radio) {
        radio.addEventListener('change', function () {
            resetPage();
            document.getElementById('file-modal').classList.remove('show');
           
         // 隐藏所有内容 div
         document.querySelectorAll('.content-div').forEach(function (div) {
             div.style.display = 'none';
         });

         // 显示对应的内容 div
         const contentDivId = 'content-' + radio.value;
         const contentDiv = document.getElementById(contentDivId);
         if (contentDiv) {
            
             contentDiv.style.display = 'block';
         }
        });
    });




// 案例级联选择器逻辑
    // 数据结构
    var options = {
        '医疗健康': {
            '医院和诊所': ['社区卫生中心', '综合医院', '专科医院'],
            '制药与生物技术': ['药物研发', '生物技术公司', '个性化治疗'],
            '医疗设备与器械': ['医疗影像分析', '家用医疗设备', '医疗机器人'],
            '健康保险': ['健康管理服务'],
        },
        '金融': {
            '银行': ['风险管理', '数字银行'],
            '保险': ['人寿/财产/健康保险', '保险科技'],
            '投资机构与贷款公司': ['欺诈检测', '智慧投顾'],
        },
        '制造业': {
            '电子产品制造': ['通信设备', '电子元件'],
            '机械设备制造': ['机械预测性维护', '机械设备制造'],
            '加工食品': ['质量控制', '智能生产线'],
        },
        '零售': {
            '电商与在线零售': ['智慧电商', '客户行为分析', '个性化推荐'],
            '实体零售': ['供应链与库存管理', '智能收银系统']
        },
        '交通运输': {
            '公路运输': ['交通管理', '出租车服务', '自行车和电动车共享', '自动驾驶'],
            '铁路运输': ['城市轨道交通', '客运'],
            '航空运输': ['客运航空', '机场服务'],
            '航运与港口': ['海运货运', '港口运营'],
            '物流与快递服务': ['快递服务', '物流优化'],
        },
        '教育': {
            '学校教育': ['素质教育', '教培知识普及'],
            '培训服务': ['职业技能培训', '文体培训', '课外辅导培训', '出国留学', '干部教育', '老年教育'],
            '教培管理服务': ['政府教培管理监督', '社会组织教培服务', '其他组织和教育园区管理服务'],
            '教培相关服务': ['教育辅助服务', '教育科技服务'],
            '教培机构设施建设': ['教培机构房屋建设', '教培机构建筑安装', '教培机构装饰装修'],
        },
        '农业': {
            '种植业': ['粮食作物', '作物监测'],
            '畜牧业': ['家畜养殖', '养殖科技'],
            '渔业': ['内陆/海洋渔业', '渔业加工'],
            '农业机械与设备': ['耕种机械', '智能灌溉'],
            '农产品加工与销售': ['初级加工', '销售渠道'],
        },
        '能源': {
            '石油，煤，天然气': ['能源勘探', '开采与加工', '能源管理'],
            '电力': ['电力生产', '智能电网', '设备预测性维护'],
            '可再生能源': ['太阳能', '风能'],
            '核能': ['核电站', '核废料处理'],
        },
        '娱乐媒体': {
            '电影,电视与短视频': ['电影与电视制作', '发行与营销'],
            '音乐与音频': ['音乐与音频制作', '音乐平台'],
            '游戏与互动娱乐': ['游戏开发', '电子竞技', '虚拟现实'],
            '出版与印刷': ['纸质印刷服务', '数字出版'],
            '广告与市场推广': ['广告创意内容生成', '广告制作'],
        },
        '公共服务': {
            '政府行政': ['立法/司法/执法'],
            '公共安全与治安': ['警察', '监狱', '社区与城市管理'],
            '消防与紧急救援': ['消防救援', '预防', '指挥与协调' ,'救援设备'],
            '公共卫生与福利': ['废物处理与生态保护', '公共安全' ,'社区服务'],
        },
    };

    // 获取三个选择器元素
    var industrySelect   = document.getElementById('industry');
    var broadClassSelect = document.getElementById('broad_class');
    var smallClassSelect = document.getElementById('small_class');

    // 初始化产业选择器
    for (var industry in options) {
        var option = document.createElement('option');
        option.value = industry;
        option.textContent = industry;
        industrySelect.appendChild(option);
    }

    // 产业选择改变时，更新大类选择器
    industrySelect.onchange = function() {
        
        broadClassSelect.innerHTML = '<option value="">请选择大类</option>';
        smallClassSelect.innerHTML = '<option value="">请选择小类</option>';
        var broad_class = options[this.value];
        for (var broadClass in broad_class) {
            var option = document.createElement('option');
            option.value = broadClass;
            option.textContent = broadClass;
            broadClassSelect.appendChild(option);
        }
    };

    // 大类选择改变时，更新小类选择器
    broadClassSelect.onchange = function() {
        smallClassSelect.innerHTML = '<option value="">请选择小类</option>';
        var small_class = options[industrySelect.value][this.value];
        for (var i = 0; i < small_class.length; i++) {
            var option = document.createElement('option');
            option.value = small_class[i];
            option.textContent = small_class[i];
            smallClassSelect.appendChild(option);
        }
    };

// 案例文件上传处理逻辑
    const fileListElement = document.getElementById('file-list');
    const readButton = document.getElementById('read-button');
    const fileInput = document.getElementById('file-input');
    const uploadTrigger = document.getElementById('upload-trigger');
    const urlUploadTrigger = document.getElementById('url-upload-trigger');
    const fileModal = document.getElementById('file-modal');
    const modalContentElement = document.getElementById('modal-content');
    const closeButton = document.querySelector('.close');
    const urlModal = document.getElementById('url-modal');
    const urlInput = document.getElementById('url-input');
    const urlSubmitButton = document.getElementById('url-submit');
    const closeUrlButton = document.querySelector('.close-url');

     var aiAnalysistext;

    let files = [];
    let selectedFileIndex = 0;
   
    var isurl=false;
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
    function resetPage() {
        files = [];
        files2 = [];
        updateFileList(1);
        updateFileList(2);
        aiAnalysistext= '';
        document.getElementById('file-input').value = ''; // 重置文件输入字段
        document.getElementById('file-input-2').value = ''; // 重置文件输入字段
        industrySelect.value = ''; 
        broadClassSelect.value = '';
        smallClassSelect.value = '';
        broadTechnologySelect.value='';
        smallTechnologySelect.value='';
        isurl=false;
    }
    uploadTrigger.addEventListener('click', function () {
        if (files.length > 0) {
            showAlert('只能上传一个文件，若想重新上传请删除之前的文件。');
        } else {
            fileInput.click();
        }
    });
    urlUploadTrigger.addEventListener('click', function () {
        if (files.length > 0) {
            showAlert('只能上传一个文件，若想重新上传请删除之前的文件。');
        } else {
            urlModal.style.display = 'block';
        }
    });
   

    fileInput.addEventListener('change', function(event) {
        const newFiles = Array.from(event.target.files);
            files = files.concat(newFiles);
            updateFileList(1);
            isUrl = false;  // 设置标志为false
    const simulatedEvent = {
        target: {
            closest: function(selector) {
                if (selector === 'span') return {}; // 模拟一个 span 元素
                if (selector === '.delete-btn') return null; // 不是删除按钮，返回 null
            }
        }
    };
    fileclick(simulatedEvent,1); // 调用 fileclick 来处理文件显示
    });
    document.getElementById('drop-area').addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    document.getElementById('drop-area').addEventListener('drop', function(event) {
        event.preventDefault();
        const newFiles = Array.from(event.dataTransfer.files);
        files = files.concat(newFiles);
        updateFileList(1);
    });

    function updateFileList(whichreuqst) {
        if(whichreuqst===1){
        fileListElement.innerHTML = '';
        if (files.length === 1) {
            const file = files[0];
            const listItem = document.createElement('li');
            listItem.className = 'file-list-item';
            listItem.innerHTML = `
                <span>${file.name}</span>
              
            `;
              // <button id="delete-btn">删除</button>
            fileListElement.appendChild(listItem);
            // 绑定删除按钮的事件
            document.getElementById('delete-btn').addEventListener('click', function() {
                deleteFile(1);
            });
        }

        
    }
    else{
        fileList2Element.innerHTML = '';
        if (files2.length === 1) {
            const file = files2[0];
            const listItem = document.createElement('li');
            listItem.className = 'file-list-item';
            listItem.innerHTML = `
                <span>${file.name}</span>
              
            `;
              // <button id="delete-btn">删除</button>
            fileList2Element.appendChild(listItem);
            // 绑定删除按钮的事件
            document.getElementById('delete-btn').addEventListener('click', function() {
                deleteFile(2);
            });
        }

    }

    }
    function fileclick(event,whichreuqst) {
        const span = event.target.closest('span');
        const deleteBtn = event.target.closest('.delete-btn');
        let file; 
        if(whichreuqst===1)
         {
        if (span) {
             file = files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileName = file.name.toLowerCase();
                if (fileName.endsWith('.txt')) {
                    modalContentElement.textContent = e.target.result;
                } else if (fileName.endsWith('.docx')) {
                    mammoth.convertToHtml({arrayBuffer: e.target.result})
                        .then(function(result) {
                            modalContentElement.innerHTML = result.value;
                        })
                        .catch(function(err) {
                            console.error(err);
                            modalContentElement.textContent = '读取 Word 文件时出错。';
                        });
                } else if (fileName.endsWith('.xlsx')) {
                    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                    const sheetNames = workbook.SheetNames;
                    const sheet = workbook.Sheets[sheetNames[0]];
                    const htmlTable = XLSX.utils.sheet_to_html(sheet);
                    modalContentElement.innerHTML = htmlTable;
                } else if (fileName.endsWith('.csv')) {
                        const csvData = e.target.result;
                        Papa.parse(csvData, {
                            header: true,
                            complete: function(results) {
                                const table = document.createElement('table');
                                const headerRow = document.createElement('tr');
                                results.meta.fields.forEach(field => {
                                    const th = document.createElement('th');
                                    th.textContent = field;
                                    headerRow.appendChild(th);
                                });
                                table.appendChild(headerRow);
                                results.data.forEach(row => {
                                    const tr = document.createElement('tr');
                                    results.meta.fields.forEach(field => {
                                        const td = document.createElement('td');
                                        td.textContent = row[field];
                                        tr.appendChild(td);
                                    });
                                    table.appendChild(tr);
                                });
                                modalContentElement.innerHTML = '';
                                modalContentElement.appendChild(table);
                            }
                        });
                    } 
                    else {
                        modalContentElement.textContent = '仅支持文本 (.txt)、Word (.docx)、Excel (.xlsx) 和 CSV (.csv) 文件。';
                        
                    }
                    document.getElementById('file-modal').classList.add('show');
                   
                };
                if (file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.csv')) {
                    reader.readAsText(file);
                } else {
                    reader.readAsArrayBuffer(file);
                }
            }

        if (deleteBtn) {
            
            deleteFile(1);
        }
    }
    else{
        if (span) {
            file = files2[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileName = file.name.toLowerCase();
                if (fileName.endsWith('.txt')) {
                    modalContent2Element.textContent = e.target.result;
                } else if (fileName.endsWith('.docx')) {
                    mammoth.convertToHtml({arrayBuffer: e.target.result})
                        .then(function(result) {
                            modalContent2Element.innerHTML = result.value;
                        })
                        .catch(function(err) {
                            console.error(err);
                            modalContent2Element.textContent = '读取 Word 文件时出错。';
                        });
                } else if (fileName.endsWith('.xlsx')) {
                    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                    const sheetNames = workbook.SheetNames;
                    const sheet = workbook.Sheets[sheetNames[0]];
                    const htmlTable = XLSX.utils.sheet_to_html(sheet);
                    modalContent2Element.innerHTML = htmlTable;
                } else if (fileName.endsWith('.csv')) {
                        const csvData = e.target.result;
                        Papa.parse(csvData, {
                            header: true,
                            complete: function(results) {
                                const table = document.createElement('table');
                                const headerRow = document.createElement('tr');
                                results.meta.fields.forEach(field => {
                                    const th = document.createElement('th');
                                    th.textContent = field;
                                    headerRow.appendChild(th);
                                });
                                table.appendChild(headerRow);
                                results.data.forEach(row => {
                                    const tr = document.createElement('tr');
                                    results.meta.fields.forEach(field => {
                                        const td = document.createElement('td');
                                        td.textContent = row[field];
                                        tr.appendChild(td);
                                    });
                                    table.appendChild(tr);
                                });
                                modalContent2Element.innerHTML = '';
                                modalContent2Element.appendChild(table);
                            }
                        });
                    } else {
                        modalContent2Element.textContent = '仅支持文本 (.txt)、Word (.docx)、Excel (.xlsx) 和 CSV (.csv) 文件。';
                    }
                    document.getElementById('file-modal-2').classList.add('show');
                };
                if (file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.csv')) {
                    reader.readAsText(file);
                } else {
                    reader.readAsArrayBuffer(file);
                }
            }

        if (deleteBtn) {
            deleteFile(2);
        }



    }
    }
    function deleteFile(whichreuqst) {
        if(whichreuqst===1)
            {
        if (files.length === 1) {
            files = []; // 清空 files 数组
            updateFileList(1);
            document.getElementById('file-modal').classList.remove('show'); // 关闭弹窗
            document.getElementById('file-input').value = ''; // 重置文件输入字段
        }
    }
    else
    {
        if (files2.length === 1) {
            files2 = []; // 清空 files 数组
            updateFileList(2);
            document.getElementById('file-modal-2').classList.remove('show'); // 关闭弹窗
            document.getElementById('file-input-2').value = ''; // 重置文件输入字段
        }
    }
    }
    document.getElementById("backlastpage").addEventListener("click",function(){
        document.getElementById('file-modal').classList.remove('show');
    });
    document.getElementById("backlastpage-2").addEventListener("click",function(){
        document.getElementById('file-modal-2').classList.remove('show');
    });
    document.querySelector(".filedelete-btn").addEventListener("click",function(){
        deleteFile(1);
    });
    document.querySelector(".filedelete-btn-2").addEventListener("click",function(){
        deleteFile(2);
    });
    document.getElementById("nextpage").addEventListener("click",function(){
        if (files.length === 0) {
            showAlert('请先上传文件。');
            return;
        }
        document.getElementById('file-modal').classList.add('show');
    });
   
    
    fileListElement.addEventListener('click', function(e){
        console.log(10);
        fileclick(e,1);
    });
  

    closeButton.addEventListener('click', function() {
        document.getElementById('file-modal').classList.remove('show');
    });

    closeUrlButton.addEventListener('click', function() {
        urlModal.style.display = 'none'; // 隐藏 URL 弹窗
    });

    // window.addEventListener('click', function(event) {
    //     if (event.target === fileModal) {
    //         fileModal.style.display = 'none'; // 隐藏弹窗
    //     }
    //     if (event.target === urlModal) {
    //         urlModal.style.display = 'none'; // 隐藏 URL 弹窗
    //     }
    // });

    // 文件传入到后端 agent API
    // async function aiAnalysis(whichreuqst) {
    //     if(whichreuqst===1){
    //     if (files.length === 0) {
    //         showAlert('请先上传文件。');
    //         return;
    //     }
    //    }
    //    else{
    //     if (files2.length === 0) {
    //         showAlert('请先上传文件。');
    //         return;
    //     }
    //    }
    //    let url='';
    //    let file='';
    //     document.getElementById('loadingOverlay').style.display = 'flex';
    //     loadingSpinner.style.display = 'block';
    //       if(isurl||isurl2){
    //         if(isurl){
    //            url = urlInput.value.trim();
    //         }
    //         else{
    //             url = urlInput2.value.trim();
    //         }
    //         const dataToSend = JSON.stringify(url);
    //         try {
    //             const response = await fetch('https://aithub.com.cn:5040/case/url', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: dataToSend
    //             });
    //             const data = await response.json();
    //             console.log('文件已发送到大模型:', data);
    //             if (data.error != null) {
    //                 document.getElementById('loadingOverlay').style.display = 'none';
    //                 loadingSpinner.style.display = 'none';
    //                 showAlert('分析失败，请检查网络。');
    //                 return;
    //             }
    //             aiAnalysistext = data.analysis;
    //         } catch (error) {
    //             document.getElementById('loadingOverlay').style.display = 'none';
    //             loadingSpinner.style.display = 'none';
    //             console.error('通过 URL 上传文件时出错:', error);
    //             showAlert('分析失败，请检查网络。');
    //         }
            
    //       }
    //       else{
    //         if(whichreuqst===1)
    //         {
    //         file = files[0];
    //         }
    //         else{
    //         file = files2[0];
    //         }

    //         console.log(file);
            
    //         var formData = new FormData();
    //         formData.append('file', file);

    //         try {
    //             const response = await fetch('https://aithub.com.cn:5040/case/file', {
    //                 method: 'POST',
    //                 body: formData
    //             });
    //             const data = await response.json();
    //             console.log('文件已发送到大模型:', data);
    //             if (data.error != null) {
    //                 document.getElementById('loadingOverlay').style.display = 'none';
    //                 loadingSpinner.style.display = 'none';
    //                 showAlert('分析失败，请检查网络。');
    //                 return;
    //             }
    //             aiAnalysistext = data.analysis;
    //         } catch (error) {
    //             document.getElementById('loadingOverlay').style.display = 'none';
    //             loadingSpinner.style.display = 'none';
    //             console.error('通过文件上传时出错:', error);
    //             showAlert('分析失败，请检查网络。');
    //         }
        
    //       }
        
       
        
    // };
  // 显示和更新进度条的函数
  let progressIntervalId = null; // 用于保存定时器 ID

  // 更新进度条的函数
  function updateProgressBar(percentage) {
      const progressBar = document.getElementById('uploadProgressBar');
      const progressText = document.getElementById('progressText');
      progressBar.style.width = `${percentage}%`;
      progressText.textContent = `${percentage}%`;
  }
  
  // 清除定时器
  function clearProgressInterval() {
      if (progressIntervalId !== null) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
      }
  }
  // 模拟进度条的动态增加
function simulateProgressUpdate(targetPercentage, interval = 100, increment = 1) {
    let currentPercentage = parseInt(document.getElementById('uploadProgressBar').style.width, 10) || 0;
    clearProgressInterval(); // 清除之前的定时器
    
    progressIntervalId = setInterval(() => {
        currentPercentage += increment;
        if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearProgressInterval(); // 到达目标百分比后清除定时器
        }
        updateProgressBar(currentPercentage);
    }, interval);
}

    async function aiAnalysis(whichRequest) {
        if (whichRequest === 1) {
            if (files.length === 0) {
                showAlert('请先上传文件。');
                return;
            }
        } else {
            if (files2.length === 0) {
                showAlert('请先上传文件。');
                return;
            }
        }
    
        let url = '';
        let file = '';
        try {
            document.getElementById('loadingOverlay').style.display = 'flex';
            document.getElementById('uploadProgressBarContainer').style.display = 'block';
            updateProgressBar(0);
    
            if (isurl || isurl2) {
                url = isurl ? urlInput.value.trim() : urlInput2.value.trim();
                const dataToSend = JSON.stringify(url);
    
                // 模拟进度条更新到70%
                simulateProgressUpdate(70);
    
                const response = await fetch('https://aithub.com.cn:5040/case/url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: dataToSend
                });
    
                const data = await response.json();
                if (data.error != null) {
                    showAlert('分析失败，请检查网络。');
                    return 70;
                }
                aiAnalysistext = data.analysis;
            } 
            else {
                file = whichRequest === 1 ? files[0] : files2[0];
                const formData = new FormData();
                formData.append('file', file);
    
                // 模拟进度条更新到 70%
                simulateProgressUpdate(70);
    
                const response = await fetch('https://aithub.com.cn:5040/case/file', {
                    method: 'POST',
                    body: formData
                });
    
                const data = await response.json();
                if (data.error != null) {
                    showAlert('分析失败，请检查网络。');
                    
                    return 70;
                }
                aiAnalysistext = data.analysis;
            }
    
            // 模拟进度条更新到 90%
            simulateProgressUpdate(90);
            return 90;
        } 
        catch (error) {
            showAlert('分析失败，请检查网络。');
            console.error('文件上传时出错:', error);
            return 70;
        }
    }
    
   
    // 获取按钮元素
    const submitButton = document.getElementById('submit');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successMessage = document.getElementById('successMessage');
     const closesuccessButton = successMessage.querySelector('.close');
     submitButton.addEventListener('click', async function () {
        if (!industrySelect.value || !broadClassSelect.value || !smallClassSelect.value) {
            showAlert('请确保所有步骤都已成功完成。');
            return;
        }
        
        const aiProgress = await aiAnalysis(1);
        if (aiProgress <=70)
            {   showAlert('分析失败，请检查网络。');
                document.getElementById('loadingOverlay').style.display = 'none';
                document.getElementById('uploadProgressBarContainer').style.display = 'none';
                return; // 如果分析失败，则中断
            }
           
    
        const industryValue = industrySelect.value;
        const broadClassValue = broadClassSelect.value;
        const smallClassValue = smallClassSelect.value;
        const textValue = aiAnalysistext;
    
        if (!textValue) {
            showAlert('分析失败，请检查网络。');
            return;
        }
    
        const bodyForCaseUpload = {
            sector: industryValue,
            division: broadClassValue,
            subsector: smallClassValue,
            text: textValue
        };
     // 模拟进度条更新到 95%
     simulateProgressUpdate(95);
     
    try {
        const response = await fetch('https://aithub.com.cn:5040/case', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyForCaseUpload)
        });

        const data = await response.json();
        console.log('数据已发送到后端：', data);

        // 模拟进度条更新到 100%
        simulateProgressUpdate(100);
       
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
            document.getElementById('uploadProgressBarContainer').style.display = 'none';
            document.getElementById('file-modal').classList.remove('show');
            updateProgressBar(0);
            successMessage.style.display = 'block';
            resetPage();
        }, 3000);
        // 显示 1 秒的 100% 进度
    } catch (error) {
        showAlert('提交失败，请检查网络。');
        console.error('提交数据时出错:', error);
        document.getElementById('loadingOverlay').style.display = 'none';
        document.getElementById('uploadProgressBarContainer').style.display = 'none';
        updateProgressBar(0);
    }
     
       
    });
    
    closesuccessButton.addEventListener('click', function () {
        successMessage.style.display = 'none';
    });
    urlSubmitButton.addEventListener('click', function() {
        const url = urlInput.value.trim();
        if (url) {
            document.getElementById('loadingOverlay').style.display = 'flex';
            loadingSpinner.style.display = 'block';
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应错误: ' + response.status);
                }
                document.getElementById('loadingOverlay').style.display = 'none';
                loadingSpinner.style.display = 'none';
                return response.blob();
            })
            .then(blob => {
                document.getElementById('loadingOverlay').style.display = 'none';
                loadingSpinner.style.display = 'none';
                const fileName = url.split('/').pop() || 'unknown_file';
                const file = new File([blob], fileName);

                if (files.length > 0) {
                    showAlert('只能上传一个文件，若想重新上传请删除之前的文件。');
                } else {
                    files.push(file);
                    updateFileList(1);
                    urlModal.style.display = 'none'; // 隐藏 URL 弹窗
                    isurl=true;  
                    const simulatedEvent = {
                        target: {
                            closest: function(selector) {
                                if (selector === 'span') return {}; // 模拟一个 span 元素
                                if (selector === '.delete-btn') return null; // 不是删除按钮，返回 null
                            }
                        }
                    };
                    fileclick(simulatedEvent,1); // 调用 fileclick 来处理文件显示
                }
            })
            .catch(error => {
                document.getElementById('loadingOverlay').style.display = 'none';
                loadingSpinner.style.display = 'none';
                console.error('通过 URL 上传文件时出错:', error);
                alert('无法通过 URL 上传文件，请检查 URL 是否有效或是否启用了跨域资源共享。');
            });
    } else {
       showAlert('请输入文件的 URL。');
    }
    });
    // “ 提交 ” 按钮点击事件
    // submitButton.addEventListener('click',async  function() {
     
    //     if (!industrySelect.value || !broadClassSelect.value || !smallClassSelect.value) {
    //         showAlert('请确保所有步骤都已成功完成。');
    //         return;
    //     } 
    //     await aiAnalysis(1);
    //     // 获取选择器的值
       
    //     const industryValue = industrySelect.value;
    //     const broadClassValue = broadClassSelect.value;
    //     const smallClassValue = smallClassSelect.value;

    //     // 获取文本框的值
    //     const textValue = aiAnalysistext;
    //     if (!textValue) {
    //         showAlert('分析失败，请检查网络。');
    //         document.getElementById('loadingOverlay').style.display = 'none';
    //         loadingSpinner.style.display = 'none';
    //         return;
    //     }
    //     const bodyForCaseUpload = {
    //         sector: industryValue,
    //         division: broadClassValue,
    //         subsector:smallClassValue,
    //         text: textValue
    //     };
    //       console.log(textValue)
    //     // 使用fetch发送数据到后端API
    //     fetch('https://aithub.com.cn:5040/case', { // 替换为实际的API端点
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',  // 发送 JSON 数据
    //         },
    //         body: JSON.stringify(bodyForCaseUpload)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
          
    //         console.log('数据已发送到后端：', data);
    //           // 隐藏加载动画
    //     document.getElementById('loadingOverlay').style.display = 'none';
    //     loadingSpinner.style.display = 'none';

    //     // 显示提交成功的提示框
    //     successMessage.style.display = 'block';
    //      // 提交成功后的逻辑
    //      resetPage();
    //      document.getElementById('file-modal').classList.remove('show');
    //         // 这里可以添加处理成功响应的代码
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         showAlert('提交失败，请检查网络。');
    //         document.getElementById('loadingOverlay').style.display = 'none';
    //         // 无论成功与否都隐藏加载动画
    //         loadingSpinner.style.display = 'none';
    //     });
    // });
    // closesuccessButton.addEventListener('click', function() {
    //     successMessage.style.display = 'none';
    // });


// 技术级联选择器逻辑
    // 数据结构
    var data = {
        '机器学习': ['监督学习','无监督学习','强化学习'],
        '深度学习': ['人工神经网络', '卷积神经网络', '循环神经网络(RNN)', '生成对抗网络', '变分自编码器'],
        '自然语言处理': ['词汇语义学', '句法解析', '文本生成', '情感分析', '对话系统'],
        '语音识别': ['语音识别框架', 'CTC(连接主义时序分类)', 'Seq2seq深度学习模型架构', '注意力机制', '端到端学习'],
        '计算机视觉': ['图像处理', '物体识别', '图像生成'],
        '知识工程': ['语义网', '知识图谱', '逻辑推理'],
        '大语言模型': ['Transformer基础架构', '训练方法', '模型架构', '应用技术'],
        '人机交互': ['用户界面设计', '输入设备', '虚拟现实', '增强现实', '自然用户界面'],
        '具身智能': ['感知与控制', '学习与规划', '应用技术'],
    }

    // 获取两个选择器元素
    var broadTechnologySelect = document.getElementById('broad_technology');
    var smallTechnologySelect = document.getElementById('small_technology');

    // 初始化省份选择器
    for (var broadTechnology in data) {
        var option = document.createElement('option');
        option.value = broadTechnology;
        option.textContent = broadTechnology;
        broadTechnologySelect.appendChild(option);
    }

    // 省份选择改变时，更新城市选择器
    broadTechnologySelect.onchange = function() {
        smallTechnologySelect.innerHTML = '<option value="">请选择小类</option>';
        var smallTechnology = data[this.value];
        for (var i = 0; i < smallTechnology.length; i++) {
            var option = document.createElement('option');
            option.value = smallTechnology[i];
            option.textContent = smallTechnology[i];
            smallTechnologySelect.appendChild(option);
        }
    };

// 技术文件上传处理逻辑
    const fileList2Element = document.getElementById('file-list-2');
    const readButton2 = document.getElementById('read-button-2');
    const fileInput2 = document.getElementById('file-input-2');
    const uploadTrigger2 = document.getElementById('upload-trigger-2');
    const urlUploadTrigger2 = document.getElementById('url-upload-trigger-2');
    const fileModal2 = document.getElementById('file-modal-2');
    const modalContent2Element = document.getElementById('modal-content-2');
    const close2Button = document.querySelector('.close-2');
    const urlModal2 = document.getElementById('url-modal-2');
    const urlInput2 = document.getElementById('url-input-2');
    const urlSubmit2Button = document.getElementById('url-submit-2');
    const closeUrl2Button = document.querySelector('.close-url-2');
    const textBox2 = document.getElementById('text-box-2');
    let files2 = [];
    var isurl2=false;
    urlUploadTrigger2.addEventListener('click', function () {
        if (files2.length > 0) {
            showAlert('只能上传一个文件，若想重新上传请删除之前的文件。');
        } else {
            urlModal2.style.display = 'block';
        }
    });
    uploadTrigger2.addEventListener('click', function () {
        if (files2.length > 0) {
            showAlert('只能上传一个文件，若想重新上传请删除之前的文件。');
        } else {
            fileInput2.click();
        }
    });
    fileInput2.addEventListener('change', function(event) {
        const newFiles = Array.from(event.target.files);
            files2 = files2.concat(newFiles);
            updateFileList(2);
            isurl2 = false;  // 设置标志为false
    const simulatedEvent = {
        target: {
            closest: function(selector) {
                if (selector === 'span') return {}; // 模拟一个 span 元素
                if (selector === '.delete-btn') return null; // 不是删除按钮，返回 null
            }
        }
    };
    fileclick(simulatedEvent,2); // 调用 fileclick 来处理文件显示
    });
 

    document.getElementById('drop-area-2').addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    document.getElementById('drop-area-2').addEventListener('drop', function(event) {
        event.preventDefault();
        const newFiles2 = Array.from(event.dataTransfer.files);
        files2 = files2.concat(newFiles2);
        updateFileList2(2);
    });
    closeUrl2Button.addEventListener('click', function() {
        urlModal2.style.display = 'none'; // 隐藏 URL 弹窗
    });

   

    // fileList2Element.addEventListener('click', function(event) {
    //     const span = event.target.closest('span');
    //     const deleteBtn = event.target.closest('.delete-btn');

    //     if (span) {
    //         selectedFileIndex2 = span.dataset.index;
    //         const file = files2[selectedFileIndex2];
    //         const reader = new FileReader();
    //         reader.onload = function(e) {
    //             const fileName = file.name.toLowerCase();
    //             if (fileName.endsWith('.txt')) {
    //                 modalContent2Element.textContent = e.target.result;
    //             } else if (fileName.endsWith('.docx')) {
    //                 mammoth.convertToHtml({arrayBuffer: e.target.result})
    //                     .then(function(result) {
    //                         modalContent2Element.innerHTML = result.value;
    //                     })
    //                     .catch(function(err) {
    //                         console.error(err);
    //                         modalContent2Element.textContent = '读取 Word 文件时出错。';
    //                     });
    //             } else if (fileName.endsWith('.xlsx')) {
    //                 const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    //                 const sheetNames = workbook.SheetNames;
    //                 const sheet = workbook.Sheets[sheetNames[0]];
    //                 const htmlTable = XLSX.utils.sheet_to_html(sheet);
    //                 modalContent2Element.innerHTML = htmlTable;
    //             } else if (fileName.endsWith('.csv')) {
    //                     const csvData = e.target.result;
    //                     Papa.parse(csvData, {
    //                         header: true,
    //                         complete: function(results) {
    //                             const table = document.createElement('table');
    //                             const headerRow = document.createElement('tr');
    //                             results.meta.fields.forEach(field => {
    //                                 const th = document.createElement('th');
    //                                 th.textContent = field;
    //                                 headerRow.appendChild(th);
    //                             });
    //                             table.appendChild(headerRow);
    //                             results.data.forEach(row => {
    //                                 const tr = document.createElement('tr');
    //                                 results.meta.fields.forEach(field => {
    //                                     const td = document.createElement('td');
    //                                     td.textContent = row[field];
    //                                     tr.appendChild(td);
    //                                 });
    //                                 table.appendChild(tr);
    //                             });
    //                             modalContent2Element.innerHTML = '';
    //                             modalContent2Element.appendChild(table);
    //                         }
    //                     });
    //                 } else {
    //                     modalContent2Element.textContent = '仅支持文本 (.txt)、Word (.docx)、Excel (.xlsx) 和 CSV (.csv) 文件。';
    //                 }
    //                 fileModal2.style.display = 'block'; // 显示弹窗
    //             };
    //             if (file.name.toLowerCase().endsWith('.txt') || file.name.toLowerCase().endsWith('.csv')) {
    //                 reader.readAsText(file);
    //             } else {
    //                 reader.readAsArrayBuffer(file);
    //             }
    //         }

    //     if (deleteBtn) {
    //         const index = deleteBtn.dataset.index;
    //         files2.splice(index, 1);
    //         updateFileList2();
    //         fileModal2.style.display = 'none'; // 隐藏弹窗
    //     }
    // });
    document.getElementById("nextpage-2").addEventListener("click",function(){
        if (files2.length === 0) {
            showAlert('请先上传文件。');
            return;
        }
        document.getElementById('file-modal-2').classList.add('show');
    });

    urlSubmit2Button.addEventListener('click', function() {
        const url = urlInput2.value.trim();
        if (url) { 
            document.getElementById('loadingOverlay').style.display = 'block';
            loadingSpinner.style.display = 'block';
            fetch(url)
                .then(response => response.blob())
                .then(blob => {
                    document.getElementById('loadingOverlay').style.display = 'none';
                    loadingSpinner.style.display = 'none';
                    const fileName = url.split('/').pop() || 'unknown_file';
                    const file = new File([blob], fileName);
                    
                    if (files2.length > 0) {
                        showAlert('只能上传一个文件，若想重新上传请删除之前的文件。');
                    } else {
                        files2.push(file);
                        updateFileList(2);
                        urlModal2.style.display = 'none'; // 隐藏 URL 弹窗
                        isurl2=true;  
                        const simulatedEvent = {
                            target: {
                                closest: function(selector) {
                                    if (selector === 'span') return {}; // 模拟一个 span 元素
                                    if (selector === '.delete-btn') return null; // 不是删除按钮，返回 null
                                }
                            }
                        };
                        fileclick(simulatedEvent,2); // 调用 fileclick 来处理文件显示
                    }
                })
                .catch(error => {
                    document.getElementById('loadingOverlay').style.display = 'none';
                    loadingSpinner.style.display = 'none';
                    console.error('通过 URL 上传文件时出错:', error);
                    showAlert('无法通过 URL 上传文件，请检查 URL 是否有效。');
                });
        } else {
            
           showAlert('请输入文件的 URL!');
        }
    });

// 从后端获取文本，还需要与后端结合进行调试
    // 获取文本框元素


    // 获取按钮元素。点击 “ AI 分析 ” 按钮后会直接通过 API 从后端获取 agent 返回的文本，需要考虑实际 agent 的相应速度。

    const submitButton2 = document.getElementById('submit-2');

    // “ 提交 ” 按钮点击事件
    // submit2Button.addEventListener('click', function() {
    //     if (!aiAnalysisSuccess2) {
    //         showAlert('请先执行 AI 分析。');
    //         return;
    //     }
    //     if (!broadTechnologySelect.value|| !smallTechnologySelect.value) {
    //         showAlert('请确保所有步骤都已成功完成。');
    //         return;
    //     }
    //       document.getElementById('loadingOverlay').style.display = 'flex';
    //     loadingSpinner.style.display = 'block'
    //     // 获取选择器的值
    //     const broadTechnologyValue = broadTechnologySelect.value;
    //     const smallTechnologyValue = smallTechnologySelect.value;

    //     // 获取文本框的值
    //     const text2Value = textBox2.value;
    //     const bodyForCaseUpload = {
    //         title:broadTechnologyValue, classification:smallTechnologyValue,description:text2Value
    //     };
       
    //     // 使用fetch发送数据到后端API
    //     fetch('https://aithub.com.cn:5040/technology', { // 替换为实际的API端点
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',  // 发送 JSON 数据
    //         },
    //         body: JSON.stringify(bodyForCaseUpload)
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('数据已发送到后端：', data);
    //           // 隐藏加载动画
    //     document.getElementById('loadingOverlay').style.display = 'none';
    //     loadingSpinner.style.display = 'none';

    //     // 显示提交成功的提示框
    //     successMessage.style.display = 'block';
    //      // 提交成功后的逻辑
    //      resetPage();
    //         // 这里可以添加处理成功响应的代码
    //     })
    //     .catch(error => {
    //         showAlert('提交失败，请检查网络。');
    
    //         // 无论成功与否都隐藏加载动画
    //         document.getElementById('loadingOverlay').style.display = 'none';
    //     loadingSpinner.style.display = 'none';
    //     });
    // });
    // closesuccessButton.addEventListener('click', function() {
    //     successMessage.style.display = 'none';
    // });
    submitButton2.addEventListener('click',async  function() {
     
        if (!broadTechnologySelect.value|| !smallTechnologySelect.value) {
            showAlert('请确保所有步骤都已成功完成。');
            return;
        } 
        const aiProgress = await aiAnalysis(2);
        if (aiProgress <=70)
            {   showAlert('分析失败，请检查网络。');
                document.getElementById('loadingOverlay').style.display = 'none';
                document.getElementById('uploadProgressBarContainer').style.display = 'none';
                return; // 如果分析失败，则中断
            }
        // 获取选择器的值
       
        const broadTechnologyValue = broadTechnologySelect.value;
        const smallTechnologyValue = smallTechnologySelect.value;

        // 获取文本框的值
        const textValue = aiAnalysistext;
        if (!textValue) {
            showAlert('分析失败，请检查网络。');
            document.getElementById('loadingOverlay').style.display = 'none';
            loadingSpinner.style.display = 'none';
            return;
        }
        const bodyForCaseUpload = {
                  title:broadTechnologyValue, classification:smallTechnologyValue,description:textValue 
               };
       
          console.log(textValue)
          simulateProgressUpdate(95);
     
          try {
              const response = await fetch('https://aithub.com.cn:5040/technology', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(bodyForCaseUpload)
              });
      
              const data = await response.json();
              console.log('数据已发送到后端：', data);
      
              // 模拟进度条更新到 100%
              simulateProgressUpdate(100);
             
              setTimeout(() => {
                  document.getElementById('loadingOverlay').style.display = 'none';
                  document.getElementById('uploadProgressBarContainer').style.display = 'none';
                  document.getElementById('file-modal-2').classList.remove('show');
                  updateProgressBar(0);
                  successMessage.style.display = 'block';
                  resetPage();
              }, 3000);
              // 显示 1 秒的 100% 进度
          } catch (error) {
              showAlert('提交失败，请检查网络。');
              console.error('提交数据时出错:', error);
              document.getElementById('loadingOverlay').style.display = 'none';
              document.getElementById('uploadProgressBarContainer').style.display = 'none';
              updateProgressBar(0);
          }
       
     
    });
   
});



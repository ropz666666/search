$(document).ready(async function() {
//   const staticData = {
//     "1": {
//         "title": "示例标题1",
//         "description": "这是内容描述1。",
//         "solution": "这是案例分析1。",
//         "future_view": "这是未来展望1。"
//     },
//     "2": {
//         "title": "示例标题2",
//         "description": "这是内容描述2。",
//         "solution": "这是案例分析2。",
//         "future_view": "这是未来展望2。"
//     }
//     // 可以继续添加更多数据
// };
  function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


// if (id && staticData[id]) {
//   document.getElementById('content_title').innerText = staticData[id].title;
//   document.getElementById('content_description').innerText = staticData[id].description;
//   document.querySelector('.case_solution p').innerText = staticData[id].solution;
//   document.querySelector('.future_view p').innerText = staticData[id].future_view;
// } else {
//   // 处理id无效或不存在的情况
//   document.getElementById('content_title').innerText = "未找到相关内容";
// }


    var isfirstopensidebar=true;
  //   async function fetchData(id) {
  //     try {
  //         const response = await fetch('http://127.0.0.1:5000/idsearch', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({ id: id })
  //         });
                
  //         const data = await response.json();
  //         console.log(data.case)
  //         return data.case; // Assuming the sectors array contains the relevant data
  //     } catch (error) {
  //         console.error('Error fetching data:', error);
  //         return null;
  //     }
    
  // }
  function populateContent(response) {
    if (response) {
      const data=response.case;
      const relatetech=response.tech;
      console.log(data);
      console.log(relatetech);
        document.getElementById('content_title').textContent = data.title || '未提供标题';
        document.getElementById('content_description').textContent = data.description || '未提供描述';
        document.querySelector('.case_solution p').textContent = data.solution || '未提供案例分析';
        document.querySelector('.future_view p').textContent = data.future_view || '未提供未来展望';
     
        const listContainer = document.querySelector('.related_tech'); // 假设你有一个 .list-container 用于放置这些 items
       // 遍历 tech 数组，生成 HTML 并插入到容器中
       relatetech.forEach(item => {
  // 创建 list-item 的 div
        const listItem = document.createElement('div');
        listItem.className = 'list-item';

        // 创建 so-items-normal 的 div
        const soItemsNormal = document.createElement('div');
        soItemsNormal.className = 'so-items-normal';

  // 创建 item-hd 的 div
  const itemHd = document.createElement('div');
  itemHd.className = 'item-hd';

  // 创建 h3 的 title 并赋值
  const titleElement = document.createElement('h3');
  titleElement.className = 'title substr';
  titleElement.textContent = item.title;

  // 创建 h4 的 classification 并赋值
  const classificationElement = document.createElement('h4');
  classificationElement.className = 'classification';
  classificationElement.textContent = item.classification;

  // 创建 item-bd 的 div
  const itemBd = document.createElement('div');
  itemBd.className = 'item-bd';

  // 创建 item-bd_cont 的 div
  const itemBdCont = document.createElement('div');
  itemBdCont.className = 'item-bd_cont';

  // 创建 p 的 row2 并赋值
  const row2Element = document.createElement('p');
  row2Element.className = 'row2';
  row2Element.textContent = item.description;

  // 将元素组合在一起
  itemHd.appendChild(titleElement);
  itemHd.appendChild(classificationElement);
  itemBdCont.appendChild(row2Element);
  itemBd.appendChild(itemBdCont);
  soItemsNormal.appendChild(itemHd);
  soItemsNormal.appendChild(itemBd);
  listItem.appendChild(soItemsNormal);

  // 将 list-item 插入到容器中
  listContainer.appendChild(listItem);
});


    } else {
        console.error('No data available to populate');
    }

  
}
  const id = getIdFromUrl();
    if (id) {
       console.log(id);
       callSectors(id);    
    } else {
        console.error('No ID provided in the URL');
    }




    document.getElementById('character-container').addEventListener('click', opensidebar);
    document.getElementById('close-btn').addEventListener('click', function() {
      $('#character-container').css("display","block");
      document.getElementById('chat-sidebar').classList.remove('open');
  });
  
      
      window.onscroll = function() {
        var backToTopBtn = document.getElementById("backToTopBtn");
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    };
    
    // 点击返回顶部按钮时，平滑滚动回顶部
    document.getElementById("backToTopBtn").onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    $('#s-top-username').hover(function(){
      $('#s-user-name-menu').css("display","block");
    }
    )
     $('#topul').hover(function(){
     
    },function(){
      $('#s-user-name-menu').css("display","none");
    }
    )
  
    $('#s-user-name-menu').hover(function(){
      $('#s-user-name-menu').css("display","block");
    },function(){
      $('#s-user-name-menu').css("display","none");
    })
    var isfirstopensidebar=true;
    function opensidebar() {
      $('#character-container').css("display","none");
      console.log(11);
      document.getElementById('chat-sidebar').classList.add('open');
      if(isfirstopensidebar===true)
        {
          addMessage("嗨，有什么可以帮助您吗",'ai-message');
          isfirstopensidebar=false;
        }
  }
  var textarea = document.getElementById("user-input");
      var input_container= document.getElementById("input-container");
  textarea.oninput=function(e){
      textarea.style.height ='auto';
      textarea.style.height = textarea.scrollHeight + 'px';
  }
  function addMessage(text, className) {
    const messagesDiv = document.getElementById('chat-messages');
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${className}`;
      messageDiv.innerText = text;
      
      // 将新消息添加到对话框的底部
      messagesDiv.appendChild(messageDiv);
      
      // 滚动到底部
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
      return messageDiv;
  }



async function callChatai(message) {
  const usermessage = message.trim();
  const thinkingMessage = '正在思考中...';
 const aireply= addMessage(thinkingMessage, 'ai-message');
  try {
    const response1 = await fetch('https://aithub.com.cn:5040/new', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  });

  const data1 = await response1.json();
  const uid = data1.uid;

  const body_for_AI = {
    "uid": uid,
    "sector_id": 1,
    "message": usermessage
};
    const response3 = await fetch('https://aithub.com.cn:5040/dialogue', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body_for_AI)
    });
     
    const data = await response3.json();
    console.log(data);
    aireply.remove();
    // 添加AI的回复
    addMessage(data.reply,'ai-message');
    console.log(data.reply);
    const utterance = new SpeechSynthesisUtterance(data.reply);
    utterance.rate = 1.6;  // 语速
utterance.pitch = 1.8; // 音调
utterance.volume = 1.0; // 音量
    utterance.onstart = () => showBubble(); // 播放开始时显示气泡
  utterance.onend = () => hideBubble(); // 播放结束时隐藏气泡
    speechSynthesis.speak(utterance);
  
} catch (error) {
    console.error('Error:', error);
   
}
}








var sectorsdata;
//使用代理服务器
// async function callSectors(id) {
 
//   try {
//     const response = await fetch('http://127.0.0.1:5000/sectors', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: id })
//     });

//     sectorsdata = await response.json();
//     console.log(sectorsdata);
//     populateContainer('container-1',  sectorsdata.response_1.cases);
//     populateContent(sectorsdata.response_4);
//     return sectorsdata;
// } catch (error) {
//     console.error('Error:', error);
//     return [];
// }
// finally{
  
//   hideing();

// }

// }
async function callSectors(id) {
  const method1 = 'near' 
  const method2 = 'mid'
  const method3 = 'far'
  const method4 = 'detail'
  try {
      // 使用 Promise.all 并行请求四个 API
      const [data1, data2, data3, data4] = await Promise.all([
          fetch(`https://aithub.com.cn:5040/case/${id}?method=${method1}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          }).then(res => res.json()),

          fetch(`https://aithub.com.cn:5040/case/${id}?method=${method2}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          }).then(res => res.json()),

          fetch(`https://aithub.com.cn:5040/case/${id}?method=${method3}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          }).then(res => res.json()),

          fetch(`https://aithub.com.cn:5040/case/${id}?method=${method4}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          }).then(res => res.json())
      ]);

      sectorsdata = {
          "response_1": data1,
          "response_2": data2,
          "response_3": data3,
          "response_4": data4
      };

      console.log(sectorsdata);
      populateContainer('container-1', sectorsdata.response_1.cases);
      populateContainer('container-2', sectorsdata.response_2.cases);
      populateContainer('container-3', sectorsdata.response_3.cases);
      populateContent(sectorsdata.response_4);
      return sectorsdata;

  } catch (error) {
      console.error('Error:', error);
      return [];
  } finally {
      hideing();
  }
}












document.getElementById('send-btn').addEventListener('click', send);
function send() {
  
  const userInput = $('#user-input').val();
    if (userInput.trim() !== '') {
        addMessage(userInput, 'user-message');
       callChatai(userInput);
        document.getElementById('user-input').value = ''; // 清空输入框
        textarea.style.height =37+'px';
      
    }
}
document.getElementById('user-input').addEventListener('keydown', function(event) {
    // 检查按下的键是否是Enter键
    if (event.keyCode === 13&&event.ctrlKey) {
        send();
       
    }
});


   document.getElementById('openleftbutton').addEventListener('click', openleftsidebar);
  document.querySelector('.menu button').addEventListener('click', function() {
  document.getElementById('leftcontainer').classList.remove('openleft'); 
    $('#openleftbutton').css("display","block");
});
function openleftsidebar()
{   console.log(1111111111111111);
 document.getElementById('leftcontainer').classList.add('openleft'); 
  $('#openleftbutton').css("display","none");
}
    
    // 使用函数查找id为2的对象
    // var objectId = arr[1];
    //     $("#contenttitle").text(json[objectId].name);
    //     $("#contenttext").text(json[objectId].content);
    //     const messages = json[objectId].name;
//跳转页面
$("#su").click(function(){
  const searchtext=$("#sousuo").val();
  console.log(searchtext);
  // var id=item.id;
  window.location.href = "index.html?isotherserach=1&searchtext=" + encodeURIComponent(searchtext);
})
//近中远迁移
function populateContainer(containerId, cases) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = '';  // 清空已有内容
  let i=1;
  cases.forEach(c => {
     if(i<=3)
     {const caseDiv = document.createElement('div');
      caseDiv.className = 'incontainer';
      
      caseDiv.innerHTML = `
          <h2>${c.title}</h2>
          <p class="row">${c.description}</p>
        
      `;
       caseDiv.addEventListener('click',function(){
        var id=c.id;
        window.location.href = "new_page.html?id=" + encodeURIComponent(id);
       })
      container.appendChild(caseDiv);
      i++;
     }
  });

}




var slider = document.getElementById('temperatureSlider');
const input = document.getElementById('temperatureInput');
var containers = [
    document.getElementById('container-1'),
    document.getElementById('container-2'),
    document.getElementById('container-3')
];
function updateContainerDisplay(value) {
  containers.forEach(container => {
      container.style.display = 'none';
      container.style.opacity = '0';
  });

  let index;
  if (value >= 0 && value < 0.33) {
      index = 0;
  } else if (value >= 0.33 && value < 0.66) {
      index = 1;
  } else {
      index = 2;
  }

  const selectedContainer = containers[index];
  selectedContainer.style.display = 'block';
  setTimeout(() => {
      selectedContainer.style.opacity = '1';
  }, 10);
}
slider.addEventListener('input', function() {
  const value = parseFloat(slider.value);
  input.value = value;
  updateContainerDisplay(value);
});

// 同步输入框和滑块的值
input.addEventListener('input', function() {
  let value = parseFloat(input.value);
  if (isNaN(value)) {
      value = 0.1; // 默认值
  } else if (value < 0) {
      value = 0;
  } else if (value > 1) {
      value = 1;
  }
  slider.value = value;
  updateContainerDisplay(value);
});
let isShowing = false; // 追踪对话框是否正在显示
let showTimeout; // 保存 setTimeout 的引用，以便清除

// 初始化容器显示
updateContainerDisplay(parseFloat(slider.value));
function showSpeechBubble() {
  const speechBubble = document.getElementById('speech-bubble');
  if (isShowing) {
    clearTimeout(showTimeout);
}
  speechBubble.classList.remove('hidden');
  speechBubble.classList.add('visible');
  isShowing = true;
  setTimeout(() => {
      speechBubble.classList.remove('visible');
      speechBubble.classList.add('hidden');
      isShowing = false;
  }, 4000); // 文字框显示时间
}

// 设定时间间隔
setInterval(showSpeechBubble, 8000);



// 点击 end-call-btn 时停止录音并关闭模态框
let mediaRecorder;
let audioChunks = [];
document.getElementById('end-call-btn').addEventListener('click', async function () {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
     
      recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i>'; // 切换回麦克风图标
  }
  speechSynthesis.cancel();
  
  // 隐藏语音通话模态框
  document.getElementById('voice-call-modal').style.display = 'none';
});

const voices = window.speechSynthesis.getVoices();

// 过滤出中文的女性声音
const chineseFemaleVoices = voices.filter(voice => 
    voice.lang.startsWith('zh') && voice.name.includes('male')
);

// 打印出找到的声音
console.log(chineseFemaleVoices);

// 如果有多个选项，您可以手动选择
if (chineseFemaleVoices.length > 0) {
    const selectedVoice = chineseFemaleVoices[0]; // 选择第一个找到的女声
    console.log(`选择的声音: ${selectedVoice.name}`);
}

document.getElementById('record-toggle-btn').addEventListener('click', async function () {

  
  let recordBtn = document.getElementById('record-toggle-btn');
 
  if (speechSynthesis.speaking) {
     hideBubble(); // 播放结束时隐藏气泡
    speechSynthesis.cancel();
   }
  if (recordBtn.classList.contains('recording')){
    // 停止录音
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      console.log("停止录音，状态：", mediaRecorder.state); // 添加调试信息
        mediaRecorder.stop();
        console.log("停止！");
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i>'; // 切换回麦克风图标

    }
    else{
      console.log("mediaRecorder 不在录音状态，当前状态：", mediaRecorder.state);
    }
}

else {
  // 开始录音
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // mediaRecorder = new MediaRecorder(stream); // 默认使用浏览器支持的格式
      
      mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });  // 尝试使用 'audio/webm'

      mediaRecorder.ondataavailable = function (event) {
          audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async function () {
        console.log("录音结束，触发 onstop 事件"); // 添加调试信息
        // let audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        let audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        // 使用浏览器默认格式
          const formData = new FormData();
               
          // 后端调用 formData.append('audio', audioBlob,'audio.mp3');




            //前端直接调用
            formData.append('file', audioBlob, 'audio.mp3');
          formData.append('model', 'whisper-1'); // 添加 model 参数
          formData.append('language', 'zh');

             console.log(111);
             const utterance = new SpeechSynthesisUtterance("您的问题我已经收到，让豆包想一想哦！");
            
utterance.rate = 1.6;  // 语速
utterance.pitch = 1.8; // 音调
utterance.volume = 1.0; // 音量
              utterance.onstart = () => showBubble(); // 播放开始时显示气泡
              utterance.onend = () => hideBubble(); // 播放结束时隐藏气泡
              speechSynthesis.speak(utterance);




          //前端直接调用
          try {
                const response = await fetch('https://api.rcouyi.com/v1/audio/transcriptions', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer sk-96Q3xExGXtFPYtTA6cD80a7c59Ff495783C7E98e244300C9',
                    },
                    body: formData
                });
  
                if (!response.ok) {
                          throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      console.log(333);
                      const result = await response.json();
                      addMessage(result.text, 'user-message');
                      callChatai(result.text);
                     
                     
                  } 
                  catch (error) {
                      console.error('Error:', error);
                  }

          // 发送录音数据到后端
          // try {
          //     const response = await fetch('http://127.0.0.1:8080/upload_audio', {
          //         method: 'POST',
          //         body: formData
          //     });
             
              
          //     if (!response.ok) {
          //         throw new Error(`HTTP error! Status: ${response.status}`);
          //     }
          //     console.log(333);
          //     const result = await response.json();
          //     addMessage(result.text, 'user-message');
          //     callChatai(result.text);
          //     // document.getElementById('user-input').value = result.text;
             
          // } catch (error) {
          //     console.error('Error:', error);
          // }

          audioChunks = []; // 清空录音数据
      };

      console.log("开始录音，状态：", mediaRecorder.state); // 添加调试信息
            mediaRecorder.start();
            recordBtn.classList.add('recording');
            recordBtn.innerHTML = '<i class="fas fa-stop"></i>'; // 切换为停止图标
  }
  else {
    console.log("无法开始录音，mediaRecorder 状态：", mediaRecorder.state);
}
}

});

     document.getElementById('record-btn').addEventListener('click', async function () {
      
      // 显示语音通话模态框
      document.getElementById('voice-call-modal').style.display = 'flex';
     // 终止任何正在播放的语音合成
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
  }

  // 播放新的语音合成
  const utterance = new SpeechSynthesisUtterance("嗨，你好！有什么问题可以和我说！");
  utterance.rate = 1.6;  // 语速
utterance.pitch = 1.8; // 音调
utterance.volume = 1.0; // 音量
  utterance.onstart = () => showBubble(); // 播放开始时显示气泡
  utterance.onend = () => hideBubble(); // 播放结束时隐藏气泡
  speechSynthesis.speak(utterance);
     });
  
  function showBubble() {
    const bubbleContainer = document.getElementById('bubble-container');
    bubbleContainer.style.display = 'flex';
}

function hideBubble() {
  const bubbleContainer = document.getElementById('bubble-container');
  bubbleContainer.style.display = 'none';
}














});




  // 假设这是从后端返回的数据


  // 假设数据不为空，隐藏加载动画并显示内容
  function hideing(){
      $('#loading-animation').fadeOut(function() {
        $('#character-container').css('display', 'block');
        $('#openleftbutton').css('display', 'block');
        $('#htmlbackground').css('display', 'block');
        $('#search_cotent').css('display', 'block');
          $('#content_title').text();
          $('#content_description').text();
          $('.case_solution p').text();
          $('.future_view p').text();
        
      });
    }
 // 模拟延迟3秒

// 返回按钮的点击事件
$('#back-button').click(function() {
  window.history.back();
});















        //这是相关案例的api

        // const request = new Request("https://api.coze.cn/v3/chat", {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': 'Bearer pat_9Ms7QnIOpdF6tRdEl563GzPl2OwboqW0IxeVSYglRINTbStHrdiV2Md0apco1r90'
        //     },
        //     body: JSON.stringify({
        //       "bot_id": "7400323843753164854",
        //       "user_id": "ropz666",
        //       "stream": true,
        //       "additional_messages": [
        //         {
        //           "role": "user",
        //           "content": messages,
        //           "content_type": "text"
        //         }
        //       ]
        //     })
        //   });
          
        //   fetch(request)
        //     .then(response => {
        //       if (!response.ok) {
        //         throw new Error(`HTTP error! status: ${response.status}`);
        //       }
          
        //       const reader = response.body.getReader();
        //       const decoder = new TextDecoder('utf-8');
        //       let buffer = '';
          
        //       function readStream() {
        //         return reader.read().then(({ done, value }) => {
        //           if (done) {
        //             console.log('Stream complete');
        //             return;
        //           }
        //           buffer += decoder.decode(value, { stream: true });
          
        //           let boundary = buffer.lastIndexOf('\n\n');
        //           if (boundary !== -1) {
        //             const chunk = buffer.slice(0, boundary);
        //             buffer = buffer.slice(boundary + 2);
          
        //             console.log('Chunk:', chunk);
          
        //             const lines = chunk.split('\n');
        //             for (const line of lines) {
        //               if (line.trim().startsWith('data:')) {
        //                 const data = JSON.parse(line.trim().slice(5));
        //                 console.log('Data:', data);
          
        //                 if (data.type === 'answer') {
        //                   try {
        //                     console.log('Raw content:', data.content);
        //                     // 尝试解析 JSON 数组，如果失败则跳过
        //                     const contentArray = JSON.parse(data.content);
        //                     const listItems = document.querySelectorAll('.list-item');

        //                     // 遍历 JSON 数组，填充内容
        //                     contentArray.forEach((item, index) => {
        //                       if (listItems[index]) {
                             
        //                         const titleElement = listItems[index].querySelector('.title.substr');
        //                         const contentElement = listItems[index].querySelector('.row2');
        //                         if (titleElement && contentElement) {
        //                           titleElement.classList.remove('loading');
        //                           contentElement.classList.remove('loading');
        //                           titleElement.textContent = item.name;
        //                           contentElement.textContent = item.content;
        //                           //技术跳转
        //                           titleElement.addEventListener("click",function(){
        //                             console.log(titleElement.textContent);
        //                })
        //                         }
                             
        //                       }
        //                     });
        //                   } catch (error) {
        //                     console.error('Error parsing content:', error);
        //                   }
        //                 }
        //               }
        //             }
        //           }
          
        //           return readStream();
        //         });
        //       }
        //       return readStream();
        //     })
        //     .catch(error => {
        //       console.error('Fetch error:', error);
        //     });


//这是对案例分析的api

            // const request2 = new Request("https://api.coze.cn/v3/chat", {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': 'Bearer pat_9Ms7QnIOpdF6tRdEl563GzPl2OwboqW0IxeVSYglRINTbStHrdiV2Md0apco1r90'
            //   },
            //   body: JSON.stringify({
            //     "bot_id": "7400721901066829836",
            //     "user_id": "ropz666",
            //     "stream": true,
            //     "additional_messages": [
            //       {
            //         "role": "user",
            //         "content": messages,
            //         "content_type": "text"
            //       }
            //     ]
            //   })
            // });
            
            // fetch(request2)
            //   .then(response => {
            //     if (!response.ok) {
            //       throw new Error(`HTTP error! status: ${response.status}`);
            //     }
            
            //     const reader = response.body.getReader();
            //     const decoder = new TextDecoder('utf-8');
            //     let buffer = '';
            
            //     function readStream2() {
            //       return reader.read().then(({ done, value }) => {
            //         if (done) {
            //           console.log('Stream complete');
            //           return;
            //         }
            //         buffer += decoder.decode(value, { stream: true });
            
            //         let boundary = buffer.lastIndexOf('\n\n');
            //         if (boundary !== -1) {
            //           const chunk = buffer.slice(0, boundary);
            //           buffer = buffer.slice(boundary + 2);
            
            //           console.log('Chunk:', chunk);
            
            //           const lines = chunk.split('\n');
            //           for (const line of lines) {
            //             if (line.trim().startsWith('data:')) {
            //               const data = JSON.parse(line.trim().slice(5));
            //               console.log('Data:', data);
            
            //               if (data.type === 'answer') {
                         
            
            //                 try {
            //                   console.log('Raw content:', data.content);
            //                   // 尝试解析 JSON 数组，如果失败则跳过
            //                   const contentArray = JSON.parse(data.content);
            //                   console.log( contentArray);
            //                   const case_study = document.querySelector('.case-study #aianswer');
            //                   const tech_analysis= document.querySelector('.tech-analysis #aianswer');
            //                   const future_prospects= document.querySelector('.future-prospects #aianswer');
            //                   case_study.classList.remove('loading');
            //                   tech_analysis.classList.remove('loading');
            //                   future_prospects.classList.remove('loading');
            //                   case_study.innerHTML = `${contentArray['case-study']}`;
            //                   tech_analysis.innerHTML = `${contentArray['tech-analysis']}`;
            //                   future_prospects.innerHTML = `${contentArray['future-prospects']}`;
                              
            //                 } catch (error) {
            //                   console.error('Error parsing content:', error);
            //                 }
            //               }
            //             }
            //           }
            //         }
            
            //         return readStream2();
            //       });
            //     }
            //     return readStream2();
            //   })
            //   .catch(error => {
            //     console.error('Fetch error:', error);
            //   });



          



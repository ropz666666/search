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
    async function fetchData(id) {
      try {
          const response = await fetch('http://127.0.0.1:5000/search', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id })
          });
                
          const data = await response.json();
          return data.sectors[0]; // Assuming the sectors array contains the relevant data
      } catch (error) {
          console.error('Error fetching data:', error);
          return null;
      }
      finally{
        hideing();
      }
  }
  function populateContent(data) {
    if (data) {
        document.getElementById('content_title').textContent = data.title || '未提供标题';
        document.getElementById('content_description').textContent = data.description || '未提供描述';
        document.getElementById('.case_solution p').textContent = data.solution || '未提供案例分析';
        document.querySelector('.future_view p').textContent = data.future_view || '未提供未来展望';
    } else {
        console.error('No data available to populate');
    }

  
}

  const id = getIdFromUrl();
    if (id) {
        const data = await fetchData(id);
        populateContent(data);
    } else {
        console.error('No ID provided in the URL');
    }




    document.getElementById('open-btn').addEventListener('click', opensidebar);
    document.getElementById('close-btn').addEventListener('click', function() {
      document.getElementById('chat-sidebar').classList.remove('open');
  });
      const incontainers=document.querySelectorAll('.incontainer');
      incontainers.forEach(function(item){
         item.addEventListener("click",function()
        {
          alert(1);
        })
      })
      
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

  async function fetchYiYanAPI(prompt) {
    const message = prompt.trim();
    const thinkingMessage = '正在思考中...';
   const aireply= addMessage(thinkingMessage, 'ai-message');
     // 调用后端API
     fetch('http://127.0.0.1:5000/api/ask', { 
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           // 这里可以添加任何需要的其他头部信息
       },
       body: JSON.stringify({ message:message})
   })
   .then(response => response.json())
   .then(data => {
     console.log(data);
     var answerObject = JSON.parse(data);
     aireply.remove();
         // 添加AI的回复
     addMessage(answerObject.result,'ai-message');
   })
   .catch(error => {
       console.error('Error:', error);
       // 这里处理错误
   });


}
document.getElementById('send-btn').addEventListener('click', send);
function send() {
  
  const userInput = $('#user-input').val();
    if (userInput.trim() !== '') {
        addMessage(userInput, 'user-message');
        fetchYiYanAPI(userInput);
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


   document.querySelector('.openleftbutton').addEventListener('click', openleftsidebar);
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
  window.location.href = "main.html?isotherserach=1&searchtext=" + encodeURIComponent(searchtext);
})


});




  // 假设这是从后端返回的数据


  // 假设数据不为空，隐藏加载动画并显示内容
  function hideing(){
      $('#loading-animation').fadeOut(function() {
        $('#htmlbackground').css('display', 'block');
        $('#search_cotent').css('display', 'block');
          $('#content_title').text(data.title);
          $('#content_description').text(data.description);
          $('.case_solution p').text(data.solution);
          $('.future_view p').text(data.future_view);
        
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



          



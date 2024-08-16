$(document).ready(function() {
  //如果是别的网页跳转过来的话
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
 
  function sendToAIDialog(text){
    opensidebar();
    addMessage(text, 'user-message');
    fetchYiYanAPI(text);
  }
  var diborder= document.querySelector('.diborder');
  var searchBar = document.querySelector('#search_bar');
  var searchBarHeight = searchBar.offsetHeight; // 获取搜索栏的高度
  var stickyTop = searchBar.offsetTop+200; // 获取搜索栏的初始偏移量
  window.onscroll = function() {
    var backToTopBtn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
    var scrollY = window.pageYOffset || document.documentElement.scrollTop; // 获取滚动条位置
            
    // 检查滚动位置是否超过了搜索栏的初始位置
    if (scrollY > stickyTop) {
      // 当滚动超过搜索栏的初始位置时，添加固定类
      if (!searchBar.classList.contains('fixed')) {
        searchBar.classList.add('fixed');
        $(diborder).css("display","inline");
        // 需要减去搜索栏的高度，避免滚动时页面跳动
        document.body.style.paddingTop = searchBarHeight + 'px';
      }
    } else {
      // 当滚动回到搜索栏的初始位置时，移除固定类
      if (searchBar.classList.contains('fixed')) {
        searchBar.classList.remove('fixed');
        $(diborder).css("display","none");
        document.body.style.paddingTop = '0';
      }
    }
};  

// 点击返回顶部按钮时，平滑滚动回顶部
document.getElementById("backToTopBtn").onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

document.addEventListener('click', function(event) {
    console.log(22);
      const chatSidebar = document.getElementById('chat-sidebar');
      const openbtn = document.getElementById('open-btn');
      const SapperButton=document.getElementById('SapperButton');
      if (chatSidebar.classList.contains('open')) {
          const dialogBox = document.getElementById('chat-sidebar');
          if (!dialogBox.contains(event.target)&&!openbtn.contains(event.target)&&!SapperButton.contains(event.target)) {
              dialogBox.classList.remove('open');
          }
      }
  });
      var textarea = document.getElementById("user-input");
      var input_container= document.getElementById("input-container");
  textarea.oninput=function(e){
      textarea.style.height ='auto';
      textarea.style.height = textarea.scrollHeight + 'px';
  }
     document.getElementById('open-btn').addEventListener('click', opensidebar);
   
  
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
  function showLoading() {
    document.getElementById('loading-container').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-container').style.display = 'none';
}
  
  async function callChatAPI(message) {
    showLoading();
    try {
      const response = await fetch('http://127.0.0.1:5000/search', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: message })
      });

      const data = await response.json();
      console.log(data.sectors);
      return data.sectors;
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
  finally {
    hideLoading(); // 隐藏加载动画
}
}

async function callChatai(message) {
  const usermessage = message.trim();
  const thinkingMessage = '正在思考中...';
 const aireply= addMessage(thinkingMessage, 'ai-message');
  try {
    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: usermessage })
    });
     
    const data = await response.json();
    aireply.remove();
    // 添加AI的回复
addMessage(data.reply,'ai-message');
    console.log(data.reply);
  
} catch (error) {
    console.error('Error:', error);
   
}
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
  document.getElementById('close-btn').addEventListener('click', function() {
      document.getElementById('chat-sidebar').classList.remove('open');
  });
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
  

  
  function highlightSearchTerm(text, term) {
          // 创建正则表达式，匹配全局，区分大小写
          var regex = new RegExp('(' + term + ')', 'gi');
          return text.replace(regex, '<span class="highlight">$1</span>');
      }
       // 假设jsonData是已经从Excel文件转换过来的JSON数据
     
     $("input[id='sousuo']").keyup(function(){
     
      if(event.keyCode == 13){
      
        $('.s_btn').click() // 自己封装的方法
      }
 });
 document.querySelector('.s_btn').addEventListener('click', handleSearch);
 async function handleSearch() {
  $('#htmlbackground').height(0);
         var searchValue = $('#sousuo').val().trim().toLowerCase(); // 使用trim()移除空白字符
         if (searchValue === '') {
             // 如果搜索值为空，则清空显示区并返回
             $('.list_container').empty();
             var so_help= $('<div class="so-help"></div>');
         var helpimg= $('<div class="helpimg"></div>');
         var img= $('<img src="image/helpimg.png" alt>');
         helpimg.append(img);
         var tips= $('<div class="tips">'+"抱歉,请你输点东西吧！"+'</div>');
         so_help.append(helpimg);
         so_help.append(tips);
         $('.list_container').append(so_help);
         $('#htmlbackground').height(715);
             return;
         }
         $('.list_container').empty(); // 清空显示区
           //请求数据

           showLoading();
           const sectors = await callChatAPI(searchValue);
           hideLoading();
           if (sectors.length === 0) {
            var so_help= $('<div class="so-help"></div>');
            var helpimg= $('<div class="helpimg"></div>');
            var img= $('<img src="image/helpimg.png" alt>');
            helpimg.append(img);
            var tips= $('<div class="tips">'+"抱歉，没有找到“"+ searchValue+"”"+'</div>');
            so_help.append(helpimg);
            so_help.append(tips);
            $('.list_container').append(so_help);
            return;
        }
        
        sectors.forEach(function(item) {
                 var name = item.title;
                 var content = item.description;
                //  var searchTermIndexName = name.toLowerCase().indexOf(searchValue);
                //  var searchTermIndexContent = content.toLowerCase().indexOf(searchValue);
                //  if (searchTermIndexName !== -1 || searchTermIndexContent !== -1) {
                //      var start = Math.max(0, searchTermIndexContent - 15); // 确保不会超出内容的开头
                //      var end = Math.min(content.length, searchTermIndexContent + 300); // 确保不会超出内容的结尾
                //      var highlightedContent = highlightSearchTerm(content.substring(start, end), searchValue);
                //      var start = Math.max(0, searchTermIndexName - 15); // 确保不会超出name字段的开头
                //      var end = Math.min(name.length, searchTermIndexName + 300); // 确保不会超出name字段的结尾
                //      var highlightedName = highlightSearchTerm(name.substring(start, end), searchValue);
                   // 假设你要搜索的是名为'name'的字段，并且内容在'content'字段
                   // if (item.name.toLowerCase().includes(searchValue)||item.content.toLowerCase().includes(searchValue)) {
                     // var title = highlightSearchTerm(item.name, searchValue);
                     // var content = highlightSearchTerm(item.content, searchValue);
                     // 添加一个list_item
                       var listItem = $('<div class="list-item"></div>');
                       var so_items_normal = $('<div class="so-items-normal"></div>');
                       var item_hd = $('<div class="item-hd"></div>');
                       var title_ubstr = $('<h3 class="title substr">'+name+'</h3>');
                      
                       item_hd.append(title_ubstr);
                        var p=$('<p class="row2">'+content+'</p>');
                        var item_bd_cont=$('<div class="item-bd_cont"></div>');
                        var item_bd=$('<div class="item-bd"</div>');
                         item_bd_cont.append(p);
                         item_bd.append(item_bd_cont);
                         so_items_normal.append(item_hd);
                         so_items_normal.append(item_bd);
                         listItem.append(so_items_normal);
                       $('.list_container').append(listItem);
                       listItem.click(function() {
                         var id=item.id;
                         window.location.href = "new_page.html?id=" + encodeURIComponent(id);
                         // 获取list_item的内容
                        // 跳转到新页面
                     });
               } 
             );







      //    jsonData.forEach(function(item) {
      //      var name = item.name;
      //      var content = item.content;
      //      var searchTermIndexName = name.toLowerCase().indexOf(searchValue);
      //      var searchTermIndexContent = content.toLowerCase().indexOf(searchValue);
      //      if (searchTermIndexName !== -1 || searchTermIndexContent !== -1) {
      //          var start = Math.max(0, searchTermIndexContent - 15); // 确保不会超出内容的开头
      //          var end = Math.min(content.length, searchTermIndexContent + 300); // 确保不会超出内容的结尾
      //          var highlightedContent = highlightSearchTerm(content.substring(start, end), searchValue);
      //          var start = Math.max(0, searchTermIndexName - 15); // 确保不会超出name字段的开头
      //          var end = Math.min(name.length, searchTermIndexName + 300); // 确保不会超出name字段的结尾
      //          var highlightedName = highlightSearchTerm(name.substring(start, end), searchValue);
      //        // 假设你要搜索的是名为'name'的字段，并且内容在'content'字段
      //        // if (item.name.toLowerCase().includes(searchValue)||item.content.toLowerCase().includes(searchValue)) {
      //          // var title = highlightSearchTerm(item.name, searchValue);
      //          // var content = highlightSearchTerm(item.content, searchValue);
      //          // 添加一个list_item
      //            var listItem = $('<div class="list-item"></div>');
      //            var so_items_normal = $('<div class="so-items-normal"></div>');
      //            var item_hd = $('<div class="item-hd"></div>');
      //            var title_ubstr = $('<h3 class="title substr">'+highlightedName+'</h3>');
      //            // var title_a= $('<a href="" target="_blank" class="block-title so-item-report">'+title+'</a>');
      //            issuccess=true;
      //            // 合并title
      //            // title_ubstr.append(title_a); 
                  
      //            item_hd.append(title_ubstr);
      //             var p=$('<p class="row2">'+highlightedContent+'</p>');
      //             var item_bd_cont=$('<div class="item-bd_cont"></div>');
      //             var item_bd=$('<div class="item-bd"</div>');
      //              item_bd_cont.append(p);
      //              item_bd.append(item_bd_cont);
      //              so_items_normal.append(item_hd);
      //              so_items_normal.append(item_bd);
      //              listItem.append(so_items_normal);
      //            $('.list_container').append(listItem);

      //            listItem.click(function() {
      //              var id=item.id;
      //              window.location.href = "new_page.html?id=" + encodeURIComponent(id);
      //              // 获取list_item的内容
      //             // 跳转到新页面
      //          });
               
      //          // 关闭模态框
              
      //        } 
      //    } 
      //  );
       var listContainerHeight = $('.list_container').height();
       var backgroundDivHeight = Math.max(715, listContainerHeight);
       $('#htmlbackground').height(backgroundDivHeight+20);
       // console.log(backgroundDivHeight);
      //  if(issuccess===false)
      //  {
      //    var so_help= $('<div class="so-help"></div>');
      //    var helpimg= $('<div class="helpimg"></div>');
      //    var img= $('<img src="image/helpimg.png" alt>');
      //    helpimg.append(img);
      //    var tips= $('<div class="tips">'+"抱歉，没有找到“"+ searchValue+"”"+'</div>');
      //    so_help.append(helpimg);
      //    so_help.append(tips);
      //    $('.list_container').append(so_help);
      //  }
     };













     //从别的界面的跳转方法
     var query = window.location.search.substring(1); // 获取URL参数
     var vars = query.split("&"); // 使用 & 来分割参数
     var params = {};
     
     for (var i = 0; i < vars.length; i++) {
       var pair = vars[i].split("=");
       params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
     }
     
     console.log(params);
     
     if (params.isotherserach === '1') {
       console.log(111111);
       $('#sousuo').val(params.searchtext); // 设置搜索框的值为searchtext参数
       $('.s_btn').click(); // 触发搜索按钮的点击事件
     }


     //点击返回顶部模块，就让窗口滚动页面上方
    });


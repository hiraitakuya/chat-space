$(function(){

  function buildHTML(message){
    if (message.img) {
      let html = 
        `<div class="main_chat__message_list__message_box">
          <div class="main_chat__message_list__message_box__top_box">
            <div class="main_chat__message_list__message_box__top_box__member_name">
              ${ message.user.name }
            /div>
            <div class="main_chat__message_list__message_box__top_box__date_info">
              ${ message.created_at }
            </div>
          </div>
          <div class="main_chat__message_list__message">
            <p class="Message__content">
              ${ message.content }
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    }
    else {
      let html = 
        `<div class="main_chat__message_list__message_box">
          <div class="main_chat__message_list__message_box__top_box">
            <div class="main_chat__message_list__message_box__top_box__member_name">
              ${ message.user_name }
            </div>
            <div class="main_chat__message_list__message_box__top_box__date_info">
              ${ message.created_at }
            </div>
          </div>
          <div class="main_chat__message_list__message">
            <p class="Message__content">
              ${ message.content }
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $('.main_chat__message_form__form_box').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__message_list').append(html);
      $('form')[0].reset();
      // $('#message_content').val('');
      $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
      $('.main_chat__message_form__form_box--send_btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});
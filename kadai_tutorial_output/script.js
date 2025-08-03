$(function () {
  // ボタンアニメーション
  $('.button-more').on('mouseover', function () {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });
  $('.button-more').on('mouseout', function () {
    $(this).animate({
      opacity: 1,
      marginLeft: 0,
    }, 100);
  });

  // カルーセル
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true
  });

  //送信ボタンクリック時の処理
  $('#submit').on('click', function (event) {
    // フォームの送信を防止
    event.preventDefault();

    //入力チェックした結果をresultに格納
    let result = inputCheck();

    // エラーが無ければフォームを送信（ここではアラートで代用）
    if (result.error == false) {
      alert('お問い合わせを送信しました。');
    } else {
      // エラーがある場合はメッセージを表示
      alert(result.message);
    }
  });

  //フォーカスが外れた時(blur)にフォームの入力チェックをする
  $('#name, #furigana, #email, #tel, #message,#prefecture').blur(function () {
    inputCheck();
  });
  // 個人情報保護方針のチェックボックスは状態が変わった時（change）にチェック
  $('#agree').on('change', function () {
    inputCheck();
  });

  //お問い合わせフォームの入力チェック機能
  function inputCheck() {
    // エラーメッセージのテキスト
    let message = '';

    // エラーがなければfalse、エラーがあればtrue
    let error = false;

    // お名前のチェック
    if ($('#name').val() == '') {
      // エラーあり
      $('#name').css('backgroundColor', '#ea9afaff');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      // エラーなし
      $('#name').css('backgroundColor', '#fafafa');
    }

    // フリガナのチェック
    if ($('#furigana').val() == '') {
      // エラーあり
      $('#furigana').css('backgroundColor', '#ea9afaff');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      // エラーなし
      $('#furigana').css('backgroundColor', '#fafafa');
    }

    //お問い合わせ内容のチェック
    if ($('#message').val() == '') {
      // エラーあり
      $('#message').css('backgroundColor', '#ea9afaff');
      error = true;
      message += 'お問い合わせ内容が入力されていません。入力してください。\n';
    } else {
      // エラーなし
      $('#message').css('backgroundColor', '#fafafa');
    }

    // メールアドレスのチェック
    if (
      $('#email').val() == '' ||
      $('#email').val().indexOf('@') == -1 ||
      $('#email').val().indexOf('.') == -1
    ) {
      // エラーあり
      $('#email').css('backgroundColor', '#ea9afaff');
      error = true;
      message += 'メールアドレスが未記入、または「＠」「.」が正しく入力されていません。入力してください。\n';
    } else {
      // エラーなし
      $('#email').css('backgroundColor', '#fafafa');
    }

    // 電話番号のチェック
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      // エラーあり（入力済みだが-がない）
      $('#tel').css('backgroundColor', '#ea9afaff');
      error = true;
      message += '電話番号に「-」を入力してください。\n';
    } else {
      // エラーなし（未入力または-あり）
      $('#tel').css('backgroundColor', '#fafafa');
    }


    // 都道府県のチェック
    if ($('#prefecture').val() == '') {
      // エラーあり
      $('#prefecture').css('background-color', '#f79999');
      error = true;
      message += '都道府県を選択してください。\n';
    } else {
      // エラーなし
      $('#prefecture').css('background-color', '#fafafa');
    }

    // 個人情報のチェックボックスのチェック
    if ($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    // エラーの有無で送信ボタンを切り替え
    if (error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    // オブジェクトでエラー判定とメッセージを返す
    return {
      error: error,
      message: message
    };
  }
});
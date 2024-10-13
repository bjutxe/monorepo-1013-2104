// バックエンドの固定URLを設定
const backendUrl = 'http://localhost:8080/api/hello';

// キー入力を表示するための要素を作成
const display = document.createElement('div');
display.id = 'display';
display.style.position = 'absolute';
display.style.top = '20px';
display.style.left = '20px';
display.style.fontSize = '24px';
display.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(display);

// 入力されたキーを保持する変数
let inputText: string = '';

// キー入力を処理する関数
const handleKeyPress = (event: KeyboardEvent) => {
  const key = event.key;

  // 数字、英小文字、英大文字、スペースのみを許可
  if (/^[a-zA-Z0-9 ]$/.test(key)) {
    inputText += key;
    display.textContent = inputText;
  }
};

// APIサーバーにデータを送信する関数
const sendName = async (name: string) => {
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    const data = await response.json();
    alert(data.message); // レスポンスをアラートで表示
  } catch (error) {
    console.error('Error:', error);
    alert('エラーが発生しました。');
  }
};

// キー入力イベントのリスナーを追加
document.addEventListener('keydown', handleKeyPress);

// フォームの作成
const form = document.createElement('form');
form.style.position = 'absolute';
form.style.top = '60px';
form.style.left = '20px';
form.style.display = 'flex';
form.style.flexDirection = 'row';
form.style.gap = '10px';

const button = document.createElement('button');
button.type = 'submit';
button.textContent = '送信';
button.style.padding = '5px 10px';
button.style.fontSize = '16px';

form.appendChild(button);
document.body.appendChild(form);

// フォームの送信イベントリスナー
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = inputText.trim();
  if (name) {
    sendName(name);
    inputText = '';
  } else {
    alert('名前を入力してください。');
  }
});

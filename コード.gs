// 転送先。複数人の場合はここに追加
const recipients = [
  '宛先メールアドレス',
]

// 検索クエリ(検索条件)を入れる
const query = '検索クエリ';

function seachMessages_(query) {
  const threads = GmailApp.search(query);
  Logger.log(`スレッド件数:${threads.length}`)
  if (threads.length === 0) {
    return [];
  }
  return threads.map((thread) => {
    const messages = thread.getMessages();
    return messages[0];
  })
}

/**
 * メールを送信します。
 */
function sendEmails() {
  const messages = seachMessages_(query)
  Logger.log(`メッセージ件数:${messages.length}`);
  for (const recipient of recipients) {
    let count = 0;
    Logger.log(`${recipient}への転送開始します。`)
    for (const message of messages) {
      count += 1;
      GmailApp.sendEmail(recipient, message.getSubject(), message.getBody(), { name: message.getFrom() })
      // 転送が完了したら既読にする。
      message.markRead();
      Logger.log(`${count}件目の送信完了！`)
    }
  }
}
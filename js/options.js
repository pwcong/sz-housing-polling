const table = document.getElementById('table');
const tableBody = table.getElementsByTagName('tbody')[0];
const btnSave = document.getElementById('save');

const waitTpye = document.getElementById('waitTpye');
const bahzh = document.getElementById('bahzh');
const xingm = document.getElementById('xingm');
const sfz = document.getElementById('sfz');

function init() {
  btnSave.addEventListener('click', function () {
    const newUser = {
      waitTpye: waitTpye.value,
      bahzh: bahzh.value,
      xingm: xingm.value,
      sfz: sfz.value,
    };

    if (
      !(
        !!newUser.waitTpye &&
        !!newUser.bahzh &&
        !!newUser.xingm &&
        !!newUser.sfz
      )
    ) {
      alert('表格所有字段不能为空');
      return;
    }
    chrome.storage.sync.set({ user: newUser, list: [] });
    alert('保存成功');
  });

  chrome.storage.sync.get(['user'], function (result) {
    const { user = {} } = result;

    waitTpye.value = user.waitTpye || '';
    bahzh.value = user.bahzh || '';
    xingm.value = user.xingm || '';
    sfz.value = user.sfz || '';
  });
}

init();

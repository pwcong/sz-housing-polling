const nameDiv = document.getElementById('name');
const typeDiv = document.getElementById('type');
const paixDiv = document.getElementById('paix');
const areaPaixDiv = document.getElementById('area_paix');
const table = document.getElementById('table');
const tableBody = table.getElementsByTagName('tbody')[0];
const show = document.getElementById('show');

function queryKey() {
  return fetch('http://zjj.sz.gov.cn/bzflh/lhmcAction.do?method=getKey').then(
    function (result) {
      return result.text();
    }
  );
}

function queryUser(key, user) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);

  return fetch(
    'http://zjj.sz.gov.cn/bzflh/lhmcAction.do?method=queryLhmcInfo1',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: Qs.stringify({
        ...user,
        bahzh: encrypt.encrypt(user.bahzh),
        xingm: encrypt.encrypt(encodeURIComponent(user.xingm)),
        sfz: encrypt.encrypt(user.sfz),
      }),
    }
  ).then(function (result) {
    return result.json();
  });
}

function drawUser(user, oldUser) {
  const { XINGM, WAIT_TPYE, PAIX, AREA_PAIX } = user;

  nameDiv.innerHTML = XINGM;
  typeDiv.innerHTML = WAIT_TPYE;

  paixDiv.innerHTML = PAIX;
  areaPaixDiv.innerHTML = AREA_PAIX;

  if (oldUser) {
    const t1 = PAIX - (oldUser.PAIX || 0);
    if (t1 > 0) {
      paixDiv.innerHTML = `${PAIX}<span class="tag down">↓${t1}</span>`;
    } else if (t1 < 0) {
      paixDiv.innerHTML = `${PAIX}<span class="tag up">↑${t1}</span>`;
    } else {
      paixDiv.innerHTML = PAIX;
    }

    const t2 = AREA_PAIX - (oldUser.AREA_PAIX || 0);
    if (t2 > 0) {
      areaPaixDiv.innerHTML = `${AREA_PAIX}<span class="tag down">↓${t2}</span>`;
    } else if (t2 < 0) {
      areaPaixDiv.innerHTML = `${AREA_PAIX}<span class="tag up">↑${t2}</span>`;
    } else {
      areaPaixDiv.innerHTML = AREA_PAIX;
    }
  }
}

function drawList(list) {
  tableBody.innerHTML = list
    .map(function (d) {
      return `
      <tr>
        <td>${dayjs(d.date).format('YYYY/MM/DD HH:mm')}</td>
        <td>${d.PAIX}</td>
        <td>${d.AREA_PAIX}</td>
      </tr>
    `;
    })
    .join('');
}

function init() {
  show.addEventListener('click', function () {
    show.className = 'hidden';
    table.className = '';
  });

  chrome.storage.sync.get(['user', 'list'], function (result) {
    const { user = {}, list } = result;

    if (!user.xingm) {
      return;
    }

    const oldUser = list[list.length - 1];
    drawUser(oldUser || {});
    drawList(list);

    queryKey().then(function (key) {
      queryUser(key, user).then(function (result) {
        const newUser = (result.rows || [])[0] || {};

        drawUser(newUser, oldUser);

        // 排序号变化的时候缓存数据
        if (
          newUser.PAIX !== (oldUser || {}).PAIX ||
          newUser.AREA_PAIX !== (oldUser || {}).AREA_PAIX
        ) {
          const newList = list.concat([
            {
              ...newUser,
              date: new Date().getTime(),
            },
          ]);

          chrome.storage.sync.set({
            list: newList,
          });

          drawList(newList);
        }
      });
    });
  });
}

init();

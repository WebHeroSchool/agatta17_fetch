let getDate = new Promise(function(resolve, reject) {
  setTimeout(() => { 
  	let date = new Date(); 
  	let options = {hour: 'numeric', minute: 'numeric', second:   'numeric', year: 'numeric', month: 'long', day: 'numeric' };
    date = date.toLocaleString('ru-RU', options);
  	resolve(date) }, 3000);
});

let search = window.location.search.toString();
let name;
if (search == '')
  name = 'agatta17';
else
  name = search.substr(10);
makeRequest = fetch(`https://api.github.com/users/${name}`);

Promise.all([makeRequest, getDate])
    .then(([a, b]) => {
    response = a;
    date = b;
})
  .then(
  	successResponse => {
      if (response.status != 200) {
        let error = document.createElement('div');
        error.innerHTML = 'Информация о пользователе не доступна';
        document.body.append(error);
        } 
      else {
        return  response.json();
        }
      },
    failResponse => {
      let error = document.createElement('div');
      error.innerHTML = 'Информация о пользователе не доступна';
      document.body.append(error);
      })
  .then(result => {
  	let spinner = document.getElementById('spinner');
    spinner.classList.toggle('hidden');
    let avatar = document.createElement('img');
    avatar.src = result.avatar_url;
    document.body.append(avatar);
    let name = document.createElement('div');
    if (result.name != null) { 
      name.innerHTML = result.name;
    } 
    else {
      name.innerHTML = result.login;
    }
    document.body.append(name);
    let bio = document.createElement('div');
    if (result.bio != null) { 
      bio.innerHTML = result.bio;
    } 
    else {
      bio.innerHTML = 'Информация о себе не заполнена';
    }
    document.body.append(bio);
    let html_url = document.createElement('a');
    html_url.href = result.html_url;
    html_url.innerHTML = result.html_url;
    document.body.append(html_url);
    let now = document.createElement('div');
    now.innerHTML = date;
    document.body.append(now);
    })
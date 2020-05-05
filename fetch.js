let search = window.location.search.toString();
let name = search.substr(10);
fetch(`https://api.github.com/users/${name}`)
  .then(
    successResponse => {
      if (successResponse.status != 200) {
        return  'Информация о пользователе не доступна';
      } 
      else {
        return  successResponse.json();
      }
    },
    failResponse => {
      return  'Информация о пользователе не доступна';
    })
  .then(result => {
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
    })
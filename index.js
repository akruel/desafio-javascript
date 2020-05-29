var users = [];
var titleFoundUsers = document.querySelector('#titleFoundUsers');
var titleUserStatic = document.querySelector('#titleUserStatic');
var divFoundUsers = document.querySelector('#foundUsers');
var divUserStatic = document.querySelector('#userStatic');
var search = document.querySelector('#search');
var btnSearch = document.querySelector('#btnSearch');
var loader = document.querySelector('#loader');

window.onload = () => {
  loader.style.display = 'none';
  resetFields();

  const API_URL =
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo';

  const api = fetch(API_URL).then((response) => response.json());

  api.then((response) => {
    response.results.map((user) => {
      reducedUser = {
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        age: user.dob.age,
        picture: user.picture,
      };
      users.push(reducedUser);
    });
  });
};

resetFields = () => {
  titleFoundUsers.innerHTML = 'Nenhum usuário filtrado!';
  titleUserStatic.innerHTML = 'Nada a ser exibido!';
  divFoundUsers.innerHTML = '';
  divUserStatic.innerHTML = '';
  foundUsers = [];
};

findUsers = (event) => {  
  if (
    (event && event.keyCode == 13 && search.value != '') ||
    (!event && search.value != '')
  ) {
    setLoader();

    let username = search.value.toLowerCase();

    let foundUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(username);
    });

    let foundUsersMale = foundUsers.filter((user) => {
      return user.gender === 'male';
    });

    let foundUsersFemale = foundUsers.filter((user) => {
      return user.gender === 'female';
    });
 
    let foundUserAges = foundUsers.reduce((acc, cur) => {
      return acc + cur.age;
    }, 0);

    titleFoundUsers.innerHTML = `${foundUsers.length} usuário(s) encontrado(s)!`;
    titleUserStatic.innerHTML = `Estatísticas`;

    if (foundUsers.length > 0) {
      foundUsers.forEach((element) => {
        divFoundUsers.innerHTML += `${getUser(element)}`;
      });

      let averAge = foundUserAges / foundUsers.length;

      divUserStatic.innerHTML = getUserStatic(
        foundUsersMale,
        foundUsersFemale,
        foundUserAges,
        averAge,
      );
    } else {
      resetFields();
    }
  } 
};

getUserStatic = (foundUsersMale, foundUsersFemale, foundUserAges, averAge) => {
  return `<p> Sexo Masculino: ${foundUsersMale.length}</p>
          <p> Sexo Feminino: ${foundUsersFemale.length}</p>
          <p> Soma das idades: ${foundUserAges}</p>
          <p> Média das idades: ${parseFloat(averAge).toPrecision(4)}</p>`;
};

getUser = (user) => {
  return `<div class="row">
            <div col s12>
               <div>
                  <img src=${user.picture.thumbnail} /> 
                  <div>${user.name}, ${user.age} anos </div>
               </div>
            </div>
          </div>`;
};

controlButton = () => {
  if (search.value == '') {
    btnSearch.className = 'waves-effect waves-light btn disabled';
  } else {
    btnSearch.className = 'waves-effect waves-light btn';
  }
};

setLoader = () => {
  loader.style.display = '';

  setInterval(() => {
    loader.style.display = 'none';
  }, 1500);
};

const movies = [{
  title: 'Думки мої тихі',
  image: 'https://i.ibb.co/35ZKPNZ/image.jpg',
  description: 'Молодий звукорежисер Вадим отримує замовлення – записати голоси закарпатських тварин. Це може стати його шансом назавжди залишити "незручну Україну" і переїхати до Канади, подалі від проблем.',
  date: '2020-01-16T00:00:00',
  director: 'Антоніо Лукіч',
  duration: '1год 54хв'
}, {
  title: 'Додому',
  image: 'https://i.ibb.co/9gN9dvj/Evge-poster.jpg',
  description: '«Додому» — український драматичний фільм 2019 року, повнометражний режисерський дебют Нарімана Алієва з Ахтемом Сеітаблаєвим у головній ролі.',
  date: '2019-07-14T00:00:00',
  director: 'Володимир Яценко',
  duration: '1год 36хв'
}];

function createSorting() {
  const sort = new URLSearchParams(location.search).get('sort');

  const nav = `
    <a class="sort__item ${sort === 'name' ? 'active' : ''}" href="${location.origin + location.pathname + '?sort=name'}">Назва</a>
    <a class="sort__item ${sort === 'date' ? 'active' : ''}" href="${location.origin + location.pathname + '?sort=date'}">Дата</a>
  `;

  return createFragmentTemplate(nav);
}

function createContentTemplate(movie) {
  const article = `<article class="card">
    <header class="card__header" style="background-image: url(${movie.image})">
      <h2 class="card__title">${movie.title}</h2>
      <span class="card__info">${new Date(movie.date).getFullYear()} - ${movie.duration}</span>
    </header>
    <section class="card__content">
      <p class="card__description">${movie.description}</p>
      <hr>
      <p>Режисер: ${movie.director}</p>
    </section>
  </article>`;

  return createFragmentTemplate(article);
}

function createFragmentTemplate(str) {
  const template = document.createElement('template');

  template.innerHTML = str;

  return template.content;
}

function appendContent(id, content) {
  const el = document.getElementById(id);

  el.appendChild(content);
}

function sortMovies(data) {
  const sort = new URLSearchParams(location.search).get('sort');

  switch(sort) {
    case 'name':
      return data.sort((a, b) => a.title.localeCompare(b.title));
    case 'date':
      return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    default:
      return data;
  }
}

function init(movies) {
  const fragment = document.createDocumentFragment();

  sortMovies(movies).forEach((movie) => {
    fragment.appendChild(createContentTemplate(movie));
  });

  appendContent('content', fragment);
  appendContent('sort', createSorting());
}

init(movies);

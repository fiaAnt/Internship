import './style.css';
import changeImageSize from './change.js';

function component() {
  const element = document.createElement('div');
  const image = document.createElement('img');
  image.id = 'image';
  image.src =
    'https://i.pinimg.com/originals/fe/ac/9a/feac9a2a2a8917156533689ea59e00aa.gif';
  image.width = 600;
  image.height = 500;
  image.alt = 'gif';

  const btn = document.createElement('button');
  btn.innerHTML = 'уменьшить картинку';
  btn.onclick = () => changeImageSize('image', 40, 30);

  element.appendChild(image);
  element.appendChild(btn);
  return element;
}
document.body.appendChild(component());

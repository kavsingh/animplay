import globalStyles from './index.css'

const root = document.createElement('div')
root.classList.add(globalStyles.root)
root.innerHTML = 'HELLO'

document.body.appendChild(root)

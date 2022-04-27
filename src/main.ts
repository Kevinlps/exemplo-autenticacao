import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
const token = localStorage.getItem('token')

if (token){

}else{
  location.href = 'login.html'
}
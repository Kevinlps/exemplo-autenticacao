import { async } from '@firebase/util'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { firebaseApp } from '../config/firebase'

const $= document.querySelector.bind(document)

const onSubmitLoginForm = (event:Event) => {
    event.preventDefault()
    const email = (<HTMLInputElement>$('#email')).value
    const password = (<HTMLInputElement>$('#password')).value

    const auth = getAuth(firebaseApp)

    //temos que lidar com uma promise (Rafael pode não voltar com a água)
    signInWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
        //se a autenticação deu certo...
        const { user } = userCredential
        const idToken = await user.getIdToken()
        localStorage.setItem('token' , idToken)
        location.href =  'index.html'
    })
    .catch((error) => {
        console.log(error)
        const errorParagraph = <HTMLParagraphElement> document.createElement('p')
        errorParagraph.innerText = 'Credencias inválidas !'

        const app = <HTMLDivElement>$('#app')
        app.insertAdjacentElement('beforeend', errorParagraph)
    })
}

const renderLoginForm = (container: HTMLElement) => {
    const htmlContent = `
    <form id="login-form">
        <div class="form-input">
            <label for="email">E-mail</label>
            <input type="email" id="email" required>
        </div>

        <div class="form-input">
            <label for="password">senha</label>
            <input type="password" id="password" required>
        </div>

       <button>Entrar</button>

    </form>
    `
    container.innerHTML = htmlContent
    const loginForm= <HTMLFormElement>$('#login-form')
    loginForm.onsubmit = onSubmitLoginForm
}

export default renderLoginForm
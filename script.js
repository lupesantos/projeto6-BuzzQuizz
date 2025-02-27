let numeroPerguntas;
let numeroNiveis;
let quizz = {};
let quizzCriado = {};
let ids = [];
let verificador = 0;
let criado;
let criado2;
let serializado;
let serializado2;
let keys = [];

function irTela1()
{
    document.querySelector('.page-content').classList.toggle('esconde');
    document.querySelector('.criarQuizz').classList.toggle('esconde');

    imprimeTela1();

}
function irTela2()
{
    let titulo = document.querySelector('input:nth-child(1)').value
    let imagem = document.querySelector('input:nth-child(3)').value
    numeroPerguntas = document.querySelector('input:nth-child(5)').value
    numeroNiveis = document.querySelector('input:nth-child(7)').value

    if(titulo.length < 20 || titulo.length > 65){
            document.querySelector('input:nth-child(1)').classList.add('holderFundo');
            document.querySelector('.inputs div:nth-child(2)').classList.remove('esconde');
        }
        else if(verificaURL(imagem) === false){
            document.querySelector('input:nth-child(3)').classList.add('holderFundo');
            document.querySelector('.inputs div:nth-child(4)').classList.remove('esconde');
        }
        else if(numeroPerguntas < 3){
            document.querySelector('input:nth-child(5)').classList.add('holderFundo');
            document.querySelector('.inputs div:nth-child(6)').classList.remove('esconde');
        }
        else if(numeroNiveis < 2){
            document.querySelector('input:nth-child(7)').classList.add('holderFundo');
            document.querySelector('.inputs div:nth-child(8)').classList.remove('esconde');
        }
        else {
            document.querySelector('.tela1').classList.toggle('esconde');
            document.querySelector('.tela2').classList.toggle('esconde');
            imprimePerguntas();
            quizz = {
                    title: titulo,
                    image: imagem,
                    questions: [],
                    levels: []
                }}}
function irTela3()
{ 
    pergunta(numeroPerguntas);
    if(numeroPerguntas%2 === 0)
    {
        document.querySelector('.tela2').classList.toggle('esconde');
        document.querySelector('.tela3').classList.toggle('esconde');
    }
    imprimeNiveis();
}
function irTela4()
{
    //nivel(numeroNiveis);
    if(numeroNiveis%2 === 0 && verificador === numeroNiveis)
    {
        document.querySelector('.tela3').classList.toggle('esconde');
        document.querySelector('.tela4').classList.toggle('esconde');
    }
    postQuizz();

    const pronto = document.querySelector('.tela4');
    pronto.innerHTML = `
        <p>Seu quizz está pronto!</p>
        <img src="${quizz.image}" alt="">
        <h1>${quizz.title}</h1>
        <div onClick="acessaQuizzCriado" class="botaoNext">
        Acessar Quizz
        </div>
        <div onClick="backToHome()" class="home">
        Voltar para home</div>

    `;
}
function imprimeTela1()
{
    const lista2 = document.querySelector('.tela1');
    lista2.innerHTML = `
        <p>Comece pelo começo</p>
        <div class="inputs">
            <input type="text" placeholder="Título do quizz"/>
            <div class="erro esconde"><p>Seu título deve ter entre 20 e 65 caracteres!</p></div>
            <input type="text" placeholder="Url da imagem do seu quizz"/>
            <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
            <input type="text" placeholder="Quantidade de perguntas do quizz"/>
            <div class="erro esconde"><p>Número mínimo de Perguntas: 3!</p></div>
            <input type="text" placeholder="Quantidade de níveis do quizz"/>
            <div class="erro esconde"><p>Número mínimo de Níveis: 2!</p></div>
        </div>
        <div onclick="irTela2()" class="botaoNext">
            Prosseguir para criar perguntas
        </div>`
    ;
}
function imprimePerguntas()
{
    const lista = document.querySelector('.tela2');
    
    lista.innerHTML = `<p>Crie suas perguntas</p>       
            <div class="pergunta 1 inputs caixa1">
                <h1>Pergunta 1</h1>
                <input type="text" placeholder="Texto da pergunta"/>
                <div class="erro esconde"><p>Sua pergunta deve ter mais de 20 caracteres!</p></div>
                <input type="text" placeholder="Cor de fundo da pergunta"/>
                <div class="erro esconde"><p>Sua cor começar em "#", seguida de 6 caracteres hexadecimais, ou seja:\n\
                números ou letras de A a F!</p></div>
                <h1>Resposta correta</h1>
                <input type="text" placeholder="Resposta correta"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <h1>Respostas incorretas</h1>
                <input type="text" placeholder="Resposta incorreta 1"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem 1"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <input type="text" placeholder="Resposta incorreta 2"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem 2"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <input type="text" placeholder="Resposta incorreta 3"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem 3"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
            </div>
         `;
    for(let i = 1 ; i < numeroPerguntas ; i++)
    {
        lista.innerHTML += `
          <div onClick="abreDivPergunta(this)" class="caixa${i+1}">
            <div class="px">
                <h1>Pergunta ${i+1}</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="inputs esconde">
                <h1>Pergunta ${i+1}</h1>
                <input type="text" placeholder="Texto da pergunta"/>
                <div class="erro esconde"><p>Sua pergunta deve ter mais de 20 caracteres!</p></div>
                <input type="text" placeholder="Cor de fundo da pergunta"/>
                <div class="erro esconde"><p>Sua cor começar em "#", seguida de 6 caracteres hexadecimais, ou seja:\n\
                números ou letras de A a F!</p></div>
                <h1>Resposta correta</h1>
                <input type="text" placeholder="Resposta correta"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <h1>Respostas incorretas</h1>
                <input type="text" placeholder="Resposta incorreta 1"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem 1"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <input type="text" placeholder="Resposta incorreta 2"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem 2"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <input type="text" placeholder="Resposta incorreta 3"/>
                <div class="erro esconde"><p>Preencha os campos de pergunta!</p></div>
                <input type="text" placeholder="URL da imagem 3"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
            </div>
        </div>
         `;
    }
    lista.innerHTML += `
        <div onclick="irTela3()" class="botaoNext">
            Prosseguir para criar níveis
        </div>
    `;
}
function imprimeNiveis()
{
    
    const lista = document.querySelector('.tela3');
    lista.innerHTML = `<p>Agora, decida os níveis</p>       
            <div class="inputs p box1">
                <h1>Nível 1</h1>
                <input type="text" placeholder="Título do nível"/>
                <div class="erro esconde"><p>Seu título deve ter mais de 10 caracteres!</p></div>
                <input type="text" placeholder="% de acerto mínima"/>
                <div class="erro esconde"><p>Sua % deve ser um valor entre 0 e 100!</p></div>
                <input type="text" placeholder="URL da imagem do nível"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <input type="text" placeholder="Descrição do nível" />
                <div class="erro esconde"><p>Sua descrição deve ter mais de 30 caracteres!</p></div>
            </div>
         `;
    for(let i = 1 ; i < numeroNiveis ; i++)
    {
        lista.innerHTML += `
          <div onClick="abreDivPergunta(this)" class="box${i+1}">
            <div class="p${i+1} px">
                <h1>Pergunta ${i+1}</h1>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="inputs esconde">
                <h1>Nível ${i+1}</h1>
                <input type="text" placeholder="Título do nível"/>
                <div class="erro esconde"><p>Seu título deve ter mais de 10 caracteres!</p></div>
                <input type="text" placeholder="% de acerto mínima"/>
                <div class="erro esconde"><p>Sua % deve ser um valor entre 0 e 100!</p></div>
                <input type="text" placeholder="URL da imagem do nível"/>
                <div class="erro esconde"><p>URL da imagem incorreta!</p></div>
                <input type="text" placeholder="Descrição do nível" />
                <div class="erro esconde"><p>Sua descrição deve ter mais de 30 caracteres!</p></div>  
            </div>
        </div>
         `;
    }
    lista.innerHTML += `
        <div onclick="nivel()" class="botaoNext">
            Finalizar Quizz
        </div>
    `;
}
function pergunta(indice)
{
    for(let i = 1 ; i <= numeroPerguntas ; i++){
        let pergunta = document.querySelector('.caixa'+i+' '+'input:nth-child(2)').value;
        let cor = document.querySelector('.caixa'+i+' '+'input:nth-child(4)').value;
        let correta = document.querySelector('.caixa'+i+' '+'input:nth-child(7)').value;
        let imgCorreta = document.querySelector('.caixa'+i+' '+'input:nth-child(9)').value;
        let incorreta1 = document.querySelector('.caixa'+i+' '+'input:nth-child(12)').value;
        let imgIncorreta1 = document.querySelector('.caixa'+i+' '+'input:nth-child(14)').value;
        let incorreta2 = document.querySelector('.caixa'+i+' '+'input:nth-child(16)').value;
        let imgIncorreta2 = document.querySelector('.caixa'+i+' '+'input:nth-child(18)').value;
        let incorreta3 = document.querySelector('.caixa'+i+' '+'input:nth-child(20)').value;
        let imgIncorreta3 = document.querySelector('.caixa'+i+' '+'input:nth-child(22)').value;

        if(pergunta.length < 20){
            document.querySelector('.caixa'+i+' '+'input:nth-child(2)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(3)').classList.remove('esconde');
            alert("Sua pergunta deve ter mais de 20 caracteres!");        
        }
        else if(verificaCor(cor)=== false){
            document.querySelector('.caixa'+i+' '+'input:nth-child(4)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(5)').classList.remove('esconde');
        }
        else if(verificaURL(imgCorreta) === false){
            document.querySelector('.caixa'+i+' '+'input:nth-child(9)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(10)').classList.remove('esconde');
        }
        else if(verificaURL(imgIncorreta1) === false){
            document.querySelector('.caixa'+i+' '+'input:nth-child(14)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(15)').classList.remove('esconde');
        }
        else if(verificaURL(imgIncorreta2) === false){
            document.querySelector('.caixa'+i+' '+'input:nth-child(18)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(19)').classList.remove('esconde');
        }
        else if(verificaURL(imgIncorreta3) === false){
            document.querySelector('.caixa'+i+' '+'input:nth-child(22)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(23)').classList.remove('esconde');
        }
        else if(correta === ''){  
            document.querySelector('.caixa'+i+' '+'input:nth-child(7)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(8)').classList.remove('esconde');
        }
        else if(incorreta1 === ''){  
            document.querySelector('.caixa'+i+' '+'input:nth-child(12)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(13)').classList.remove('esconde');
        }
        else if(incorreta2 === ''){  
            document.querySelector('.caixa'+i+' '+'input:nth-child(16)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(17)').classList.remove('esconde');
        }
        else if(incorreta3 === ''){  
            document.querySelector('.caixa'+i+' '+'input:nth-child(20)').classList.add('holderFundo');
            document.querySelector('.caixa'+i+' '+'div:nth-child(21)').classList.remove('esconde');
            console.log('entrou aqui!');
        }
        else{
            document.querySelector('.tela2').classList.toggle('esconde');
            document.querySelector('.tela3').classList.toggle('esconde');

            quizz.questions[i-1] = 
            {
                title: pergunta,
                color: cor,
                answers: []
            }
            quizz.questions[i-1].answers = [ 
                    {
                        text: correta,
                        image: imgCorreta,
                        isCorrectAnswer: true
                    },
                    {
                        text: incorreta1,
                        image: imgIncorreta1,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta2,
                        image: imgIncorreta2,
                        isCorrectAnswer: false
                    },
                    {
                        text: incorreta3,
                        image: imgIncorreta3,
                        isCorrectAnswer: false
                    },]
        }
    }
}
function abreDivPergunta(elemento)
{
    elemento.classList.toggle('teste');
    const menu = document.querySelector('.teste .px');
    const perguntas = document.querySelector('.teste .esconde');
    menu.classList.toggle('esconde');
    perguntas.classList.toggle('esconde');
    elemento.classList.toggle('teste');
}
function nivel(indice)
{
    let aux = 0;
    for(let i = 1 ; i <= numeroNiveis ; i++){

        let titulo = document.querySelector('.box'+i+' '+'input:nth-child(2)').value;
        let acerto = document.querySelector('.box'+i+' '+'input:nth-child(4)').value;
        let imgNivel = document.querySelector('.box'+i+' '+'input:nth-child(6)').value;
        let descricao = document.querySelector('.box'+i+' '+'input:nth-child(8)').value;

        
        if(titulo.length < 10)
        {
            document.querySelector('.box'+i+' '+'input:nth-child(2)').classList.add('holderFundo');
            document.querySelector('.box'+i+' '+'div:nth-child(3)').classList.remove('esconde');       
        }
        else if(acerto < 0 || acerto > 100 || acerto === ''|| acerto === NaN)
        {
            document.querySelector('.box'+i+' '+'input:nth-child(4)').classList.add('holderFundo');
            document.querySelector('.box'+i+' '+'div:nth-child(5)').classList.remove('esconde');  
        }
        else if(verificaURL(imgNivel) === false)
        {
            document.querySelector('.box'+i+' '+'input:nth-child(6)').classList.add('holderFundo');
            document.querySelector('.box'+i+' '+'div:nth-child(7)').classList.remove('esconde');
        }
        else if(descricao.length < 30)
        {
            document.querySelector('.box'+i+' '+'input:nth-child(8)').classList.add('holderFundo');
            document.querySelector('.box'+i+' '+'div:nth-child(9)').classList.remove('esconde');        
        }
        else if(acerto != 0)
        {
            {
                quizz.levels[i-1] = 
                {
                    title: titulo,
                    image: imgNivel,
                    text: descricao,
                    minValue: acerto
                }
            }

            aux++;
            console.log(aux);
            if(aux == numeroNiveis)
            {
               alert("Pelo menos um de seus níveis deve ter 0%");
               aux = 0;
            }
            else{
                irTela4();
            }
        }  
        else
        {
            verificador++;
            document.querySelector('.tela3').classList.toggle('esconde');
            document.querySelector('.tela4').classList.toggle('esconde');
            quizz.levels[i-1] = 
            {
                title: titulo,
                image: imgNivel,
                text: descricao,
                minValue: acerto
            }}}}
function verificaCor(string)
{
    if(string.length !== 7)
    {
        return false;
    }
    else if(string[0] === '#')
    {
        for(let i = 1 ; i < 7 ; i++)
        {
            if(string[i].keycode < 48 || string[i].keycode > 70)
            {
                return false;
            }
        }
        return true; 
    }
else return false;
}
function verificaURL(string)
{
    try
    {
        let a = new URL(string);
        return true;
    }
    catch(aaa)
    {  
        return false;
    }
}
function postQuizz()
{
    const promisse1 = axios.post('https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes', quizz);
    promisse1.catch(deuErro);
    promisse1.then(recebeMeuQuizz);
}
function deuErro()
{
    console.log('deu alguma coisa errada ai mano');
}
function deuBom()
{
    console.log('deu bom! Quizz apagado!');
}
function recebeMeuQuizz(resposta)
{
    quizzCriado = resposta.data;
    
    ids = [];
    keys = [];

    criado = window.localStorage.getItem('meuQuizz');
    criado2 = window.localStorage.getItem('meuKey');
    criado3 = window.localStorage.getItem('meuObjeto');

    if(criado === null)
    {
        ids[0] = quizzCriado.id;
        keys[0] = quizzCriado.key;

        criado = JSON.stringify(ids);
        criado2 = JSON.stringify(keys);
       
        window.localStorage.setItem('meuQuizz', criado);
        window.localStorage.setItem('meuKey', criado2);
     
        console.log(criado);
        console.log(criado2);
      
    }
    else
    {
        criado = JSON.parse(criado);
        criado2 = JSON.parse(criado2);
        
        criado[criado.length] = quizzCriado.id;
        criado2[criado2.length] = quizzCriado.key;

        serializado = JSON.stringify(criado);
        serializado2 = JSON.stringify(criado2);
      
        window.localStorage.setItem('meuQuizz', serializado); 
        window.localStorage.setItem('meuKey', serializado2); 
      
        console.log(serializado);
        console.log(serializado2);
        
    }
}
 function arrayIds()
{
    criado = window.localStorage.getItem('meuQuizz');
    criado2 = window.localStorage.getItem('meuKey');
    criado = JSON.parse(criado);
    criado2 = JSON.parse(criado2);
    return criado;
}
function deleteQuizz(event)
{ 
    console.log(event);
    let y = event.parentElement.parentElement;
    console.log(y);
    let x = y.getAttribute('id');
    console.log(x);
    x = Number(x);
    console.log(x);

    for(let i = 0; i < criado.length ; i++)
    {
        if(x === criado[i])
        {
            let key = criado2[i];
            
            const deletando = axios.delete(`${API_URL2}/quizzes/${x}`, {
                headers: {
                            'Secret-Key': key
                         },
                                  });
            deletando.catch(deuErro);
            deletando.then(deuBom);
        }
    }
}
function testa(event)
{
    event.stopPropagation();
}
function acessaQuizzCriado()
{

}

const API_URL2= "https://mock-api.driven.com.br/api/v7/buzzquizz";
const API_URL = "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes";
let quizzData;
let index = 0;
let correctAnswer = 0;
let incorrectAnswer = 0;
let accuracyRate = 0;
let levelIndex = 0;
let globalIndex =0;
let myquizzes;

function hideHomePage (){
    let homePage = document.querySelector(".home-page")
    homePage.classList.add("hidden")
}
function gettingQuizzData(){
    let requestData = axios.get(API_URL)
    requestData.catch(errorGettingData)
    requestData.then(storageQuizzData)

}
function errorGettingData(response){
    console.log(response)
}
function storageQuizzData(response){
    quizzData = response.data
    renderAllQuizzesData()
}
function renderAllQuizzesData(){
    let allQuizzes = document.querySelector(".all-quizzes .template-container")
    let myQuizzes = document.querySelector(".quizz-maker-small .template-container")
    
    if(criado === null)
    {
        for (i = 0; i < quizzData.length; i++)
        {
            allQuizzes.innerHTML += `<div onclick="openingQuizzPage(this)" id ="${quizzData[i].id} "class="all-quizzes-template" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzData[i].image}');">
            <p>${quizzData[i].title}</p>
        </div>`
        }
    }
    else
    {
        for (i = 0; i < quizzData.length; i++){
            for (j = 0; j < criado.length; j++){
    
                if (quizzData[i].id === criado[j]){
                    myQuizzes.innerHTML +=`<div onclick="openingQuizzPage(this)" id ="${quizzData[i].id} "class="my-quizzes-template" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzData[i].image}');">
                <p>${quizzData[i].title}</p>
                <div class="delete">
                <ion-icon name="create-outline"></ion-icon>
                <ion-icon onClick="testa(event); if(confirm('Quer mesmo apagar seu lindo Quizz?')) deleteQuizz(this);"name="trash-outline"></ion-icon>
            </div>
            </div>`
                }
                else {
                    allQuizzes.innerHTML += `<div onclick="openingQuizzPage(this)" id ="${quizzData[i].id} "class="all-quizzes-template" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzData[i].image}');">
                <p>${quizzData[i].title}</p>
            </div>`
                }
            }
        }
    }
    
}
function openingQuizzPage(element){
    let selectedQuizzId = Number(element.getAttribute("id"))
    for (index = 0; index < quizzData.length; index++){
        if (selectedQuizzId === quizzData[index].id){
            globalIndex = index;
            showLoaderAndHidePage()
            hideHomePage()
            renderQuizzPageBanner(index)
            renderQuizzPageQuestions(index)
        }
    }
}
function renderQuizzPageBanner(element){
    let quizzPage = document.querySelector(".quizz-page")
    console.log(quizzData[element],quizzData,index)
    quizzPage.innerHTML += `<div style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.62%, rgba(0, 0, 0, 0.8) 100%), url('${quizzData[element].image}');"class="banner">
    <p>${quizzData[element].title}</p></div>`
}
function renderQuizzPageQuestions(element){ 
    let j = [0,1,2,3]
    j = j.sort(() => Math.random() - 0.5)
    let questionsData = quizzData[element].questions
    let quizzPage = document.querySelector(".quizz-page")
        questionsData.map((question)=>{
            quizzPage.innerHTML += `<div class="question-container">
        <p style ="background-color:${question.color} ; "class="question-title">${question.title}</p>
        <div class="question-template">
        <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[j[0]].isCorrectAnswer}">
                        <img src ="${question.answers[j[0]].image}">
                        <p class="answer-text">${question.answers[j[0]].text}</p>
                    </div>
                    <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[j[1]].isCorrectAnswer}">
                        <img src ="${question.answers[j[1]].image}">
                        <p class="answer-text">${question.answers[j[1]].text}</p>
                    </div>
                    <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[j[2]].isCorrectAnswer}">
                        <img src ="${question.answers[j[2]].image}">
                        <p class="answer-text ">${question.answers[j[2]].text}</p>
                    </div>
                    <div onclick="changeAnswerTextColor(this)" class="options ${question.answers[j[3]].isCorrectAnswer}">
                        <img src ="${question.answers[j[3]].image}">
                        <p class="answer-text">${question.answers[j[3]].text}</p>
                    </div>` 
        })
        quizzPage.innerHTML+=`<div></div>` 
        
    
}
function renderQuizzLevel(){
    let quizzPage = document.querySelector(".quizz-page")
    quizzPage.innerHTML += `<div class="level-container ">
    <p class="level-title">${accuracyRate}%:${quizzData[globalIndex].levels[levelIndex].title}</p>
    <div class="level-template">
        <img src ="${quizzData[globalIndex].levels[levelIndex].image}">
        <p>${quizzData[globalIndex].levels[levelIndex].text}</p>
    </div>
    </div>
    <div class="quizz-page-end">
                <button onclick="restartingQuizz()" class="restart-quizz">Reiniciar quizz</button>
                <button onclick="backToHome()" class="home">Voltar para home</button>
            </div>`

}
function changeAnswerTextColor(element){
    let elementClassList = element.classList.value
    let parentElement = element.parentElement;
    let wrongAnswers = parentElement.querySelectorAll(".options.false p")
    if (elementClassList === "options true"){
        element.querySelector("p").classList.add("green")
        wrongAnswers.forEach(falseOptions => {falseOptions.classList.add("red")
    });
    }
    else if (elementClassList === "options false"){
        parentElement.querySelector(".options.true p").classList.add("green")
        wrongAnswers.forEach(falseOptions => {falseOptions.classList.add("red")
    });
    }
    addOpacityOnNotSelected(element)
}
function addOpacityOnNotSelected (element){
    
    let clickedQuestion = element.parentElement
    let opacityStatus = clickedQuestion.querySelectorAll(".options img.opacity")
    if (opacityStatus.length === 0){
        let answersImgs = clickedQuestion.querySelectorAll(".options img")
        answersImgs.forEach(img => {img.classList.add("opacity")})
        element.querySelector("img").classList.remove("opacity");
        setTimeout(function (){scrollQuestionIntoView(element)},2000);
        if(element.classList[1] === "true"){
            correctAnswer ++;
        }
        else if(element.classList[1] === "false"){
            incorrectAnswer++;
        }
       
    }
    levelCalculator()
    checkForLastQuestion()
    
    
    
    function checkForLastQuestion(){
        let lastQuestion = clickedQuestion.parentElement.parentElement.lastElementChild.previousElementSibling.lastElementChild
        if(lastQuestion === clickedQuestion){
            renderQuizzLevel()
            setTimeout(function (){scrollLevelIntoView()},2000)
        }    
    }

}
function scrollQuestionIntoView(element){
    let questionContainer = element.parentElement.parentElement
    questionContainer.nextSibling.scrollIntoView()
}
function scrollLevelIntoView(){
    let quizzPage = document.querySelector(".quizz-page")
    quizzPage.scrollIntoView(false)
}
function levelCalculator(){
    accuracyRate = Math.round(correctAnswer/(incorrectAnswer+correctAnswer)*100);
    let levelPorcentages = quizzData[globalIndex].levels.map(levels => levels.minValue)
    let highestLevelIndex = levelPorcentages.indexOf(Math.max(...levelPorcentages))
    let lowestLevelIndex = levelPorcentages.indexOf(Math.min(...levelPorcentages))
    if (accuracyRate >= levelPorcentages[highestLevelIndex]){
        levelIndex = highestLevelIndex;
    }
    else {
        levelIndex = lowestLevelIndex;
    }
}
function backToHome (){
    window.location.reload()
    
}
function restartingQuizz(){
    correctAnswer = 0;
    incorrectAnswer = 0;
    showLoaderAndHidePage()
    let quizzPage = document.querySelector(".quizz-page");
    quizzPage.innerHTML = "";
    renderQuizzPageBanner(globalIndex);
    renderQuizzPageQuestions(globalIndex);
    quizzPage.scrollIntoView(true);
}
function showLoaderAndHidePage(){
    let pageContent = document.querySelector(".page-content");
    pageContent.classList.add("hidden");
    let loader = document.querySelector(".loader");
    loader.classList.remove("hidden")
    setTimeout(removeLoaderAndShowPage,1000)
    
}
function removeLoaderAndShowPage(){
    let pageContent = document.querySelector(".page-content");
    pageContent.classList.remove("hidden");
    let loader = document.querySelector(".loader");
    loader.classList.add("hidden")
}
showLoaderAndHidePage()
gettingQuizzData()
arrayIds()
   
checkForMyQuizzes()

function checkForMyQuizzes(){
    let zeroMyQuizzes = document.querySelector(".quizz-maker-big");
    let myQuizzes = document.querySelector(".quizz-maker-small")
    console.log(criado)
    if (criado !== null){
        zeroMyQuizzes.classList.add("hidden")
        myQuizzes.classList.remove("hidden")
    }
}

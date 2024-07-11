<h1>Como o Task Manager funciona</h1>

<h4>
     O projeto terá 3 partes uma para todas as tarefas, uma para as tarefas já completas e uma para as tarefas deletadas
     Também será necessário um criador de tarefas, uma página para registrar e uma para logar
</h4>

<p>Quer dar uma olhada no projeto clique <a href = "https://task-manager-q6ci.onrender.com/">aqui </a></p>

<p>Todos os dados ficaram em coleções do banco de dados mongoDB</p>
     
<h3>Como a registração funciona?</h3>
     <p>.Para o usuário poder criar as suas tarefas ele deve ter uma conta e está logado, mas como ele faz isso</p>
     <p>.Depois que ele clicar no link para a página de registro e ter criado um novo usuário, os dados desse usuário seram mandados para o mongoDB como um objeto JSON e pronto o usuário possui uma conta.</p>

<p>.Com a conta criada agora é hora de logar nela, aqui eu usei uma solicitação post e quando o botão para enviar os dados for clicado um objeto contendo o nome do usuário é mandado para o backend, fiz isso, pois usarei o nome do user como valor do método findOne do mongoose para encontrar os dados do usuário no banco de dados. </p>
     <p>.Caso os dados sejam encontrados retornaremos um token, o id do usuário e o seu username e com isso ele estará logado.</p>

<p>.Assim que o usuário estiver logado outros links apareceram no lugar de login and register, sendo esses Home onde todos os projetos do usuário seram mostrados, Create Task que leva o usuário até a página onde novas tarefas podem ser criadas, Completed que é onde todas as tarefas que o usuário considerou como completas ficaram e por fim vem Logout que simplesmente faz com que o usuário não esteja mais logado quando clicado</p>

<h3>A página Home</h3>
<p>.Para mostrar todas as tarefas feitas pelo usuário na página Home eu dive que fazer duas coisas uma foi pegar todas as tarefas feitas pelo usuário no banco de dados e mostra-los</p>
<p>.Para pegar os dados eu fiz um solicitação get onde na propría url da solicitação eu coloque o username do usuário assim seria possivel usa-lo para achar todos as tarefas feitas pelo usuário, o método que eu usei foi o find mais o username que eu peguei da url e para ordenar em ordem de adição eu usei o momento em que a tarefa foi criada(createdAt) e por fim retornei esses dados para o front-end.</p>
<p>.Eu peguei os dados das tarefas e os coloquei em uma state variable vamos chamar ela de taskInfo, depois usei a função map para criar uma tarefa por elemento que estiver em taskInfo, como estou usando React basta pegar a propriedade e a string aparecerá na tarefa</p>
     
<h3>A página Create Task</h3>
     <p>.Aqui é onde o usuário poderá criar suas tarefas, possuindo um input para o titulo da tarefa e uma caixa de texto para falar sobre o que ela se trata e por fim um botão para enviar os dados para o mongoDB.</p>

<p>.Para criar a tarefa e manda-la para o banco de dados eu criei uma função que é executada assim que o formulário for enviado, essa função chamada de NewTask fará uma solicitação do tipo post onde o seu body são as state variables que recebem como valor o valor dos inputs de titulo e conteudo.</p>

<p>.Tendo mandados os dados dos inputs para o backend, usaremos eles para criar um novo objeto na coleção tasks do mongoDB, usando a função do mongoDB create com os dados como valor</p> 


<h3>Deletando tarefas</h3>
     <p>.Para deletar um tarefa o usuário terá que clicar no botão vermelho e com isso uma solicitação do tipo delete será feita, nela o id da tarefa é enviado na url, assim poderemos saber que tarefa deve ser deletada.</p>
     <p>.No backend usamos o modelo das tarefas,  mais a função deleteOne do mongoDB e como valor da função usaremos o id da tarefa.</p>
     
<h3>A página completed</h3>
     <p>.É aqui que as tarefas completadas ficaram depois do usuário clicar o botão verde da tarefa</p>
     <p>.O complite tem a seguinte logica: Primeiro criaremos uma nova coleção onde os dados das tarefas completas ficaram, em seguida pegaremos os dados da tarefa completeda e criaremos uma nova tarefa, mas dessa vez colocaremos ela na coleção completed, já tendo colocado os dados na nova coleção deletaremos a tarefa completada da coleção anterios(Tasks) e com isso ela não será mostrada no Home e por fim pegarei todas as tarefas que estão na coleção completed e as mostrarei na página completed.</p>

<h3>Logout</h3>
     <p>.É apenas um link que quando clicado manda uma solicitação post, onde limpamos os cookies e mandamos um JSON ok, caso a operação sejá um sucesso  o usuário desconectado de sua conta e  mandado para a página root onde ele será instruido a logar.</p>

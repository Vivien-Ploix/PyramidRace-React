import React from 'react';



const Jumbotron = () => {
  return(
    
    <div id="home" className="header-hero bg_cover" style={{backgroundImage: `url(${"assets/images/header-bg.jpg"})`}}>
          <div className="container">
               <div className="row justify-content-center">
                   <div className="col-xl-8 col-lg-10">
                       <div className="header-content text-center">
                          <h3 className="header-title">Bienvenue sur Pyramid Race !</h3>
                          <h2>Confronte ta culture générale avec d'autres joueurs !</h2>
                          <p className="text">Prouve que tu es le meilleur en atteignant le haut de la pyramide ou tu erreras dans ses labyrinthe jusqu'à ce que tu te transforme en momie</p>
                          <ul className="header-btn">
                             <li><a className="main-btn btn-one" rel="nofollow" href="https://rebrand.ly/start-ud">Je veux jouer !</a></li>
              
                          </ul>
                       </div> 
                  </div>
               </div> 
           </div> 
     <div className="header-shape">
        <img src="assets/images/header-shape.svg" alt="shape"></img>
    </div>
</div> 
             
    
      
) 
}


export default Jumbotron;
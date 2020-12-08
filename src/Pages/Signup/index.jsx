  
import React from 'react';




const SignUp = () => {

  return (
    <div>
     <section id="contact" class="contact-area" style={{marginBottom: "50px",marginTop: "50px"}}>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section-title text-center pb-10">
                        <h3 class="title">Inscription</h3>
                        <p class="text">Tu es brave et courageux, si tu es ici c'est que tu veux tenter l'aventure et atteindre le sommet de la Pyramid Race !</p>
                        <small>Tu vas surement mourir mais bravo pour ton courage 😏</small>
                   
                    </div> 
                </div>
            </div> 
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-form">
                        <form id="contact-form"  method="post" >
                            <div class="row">
                          
                                <div class="col-md-12">
                                    <div class="single-form form-group">
                                        <input type="email" name="email" placeholder="Tape ton adresse mail"></input>
                                   
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="single-form form-group">
                                        <input type="email" name="email" placeholder="Tape ton pseudo (Choisi un truc qui en jette sinon on te jette (de la pyramide...)"></input>
                                   
                                    </div>
                                </div>
                        
                        
                                <div class="col-md-12">
                                    <div class="single-form form-group">
                                        <input placeholder="Tape ton mot de passe" type="password" name="password"></input>
                                        
                                    </div>
                                </div>
                               
                                <div class="col-md-12">
                                    <div class="single-form form-group text-center">
                                        <button type="submit" class="main-btn">Me connecter</button>
                                    </div> 
                                </div>
                                <img src = '/assets/images/aztequesign.png' style={{marginTop: "50px"}}></img>
                            </div>
                        </form>
                    </div> 
            </div>
        </div> 
    </div>
    </section>
  
    </div>
  
  )
}


export default SignUp;
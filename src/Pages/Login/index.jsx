  
import React from 'react';




const Login = () => {

  return (
 
    <div>
    <section id="contact" class="contact-area" style={{marginBottom: "50px",marginTop: "50px"}}>
       <div class="container">
           <div class="row justify-content-center">
               <div class="col-lg-6">
                   <div class="section-title text-center pb-10">
                       <h3 class="title">Se connecter</h3>
                       <p class="text">Avant de monter la pyramide il faut décliner ton identité ! Il serait regretable que ton nom n'entre pas dans l'histoire ...</p>
                       
                  
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
                                       <input type="email" name="email" placeholder="Tape ton adresse mail (pas trop fort)"></input>
                                  
                                   </div>
                               </div>
                       
                               <div class="col-md-12">
                                   <div class="single-form form-group">
                                       <input placeholder="Tape ton mot de passe (idem)" type="password" name="password"></input>
                                       
                                   </div>
                               </div>
                              
                               <div class="col-md-12">
                                   <div class="single-form form-group text-center">
                                       <button type="submit" class="main-btn">Me connecter</button>
                                   </div> 
                               </div>
                               <img src = '/assets/images/aztequelog.png' style={{marginTop: "50px"}}></img>
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


export default Login;
import {createServer} from "http"

let server = createServer(function (request , response) {
    console.log(request);

    response.write(`                                                |                                                                                 '                   
    .                     +  - o -                          +                                                                        
                               |                                                   |                                                 
                                                                                 --o--                                               
                                                                                   |                                         .       
 _|_                                                                                                                                 
|             |                                                                               o              .                                  '
--o--                                                                                                                                              
|                                         '                                                                                          *           
                             '                   |     o         *                 '                                                 
   |                                            -+-                                          |                                   +   
 - o -                   +                       | +        .                              - o -              .                      
   |              +               '               _|_                                        |                                       
                                                   |       |                            .                                            
                                          |              - o -                                                                       
                                         -o-               |                                                                         
                                          | .                                                  .                                     
                                                                                                              o                      
                                                                                                                                     
                                                                                                                  .                  
                                                      '                                                                              
                              |                                             o                                                        
                    .       - o -                                                         .                      _|_                 
                              |                                             '                                     |                  
                                                                                                                                 _|_ 
.                                                         '    '                                              '                                 |  
                                                                                                                  '             .    `)

})

server.listen(80);
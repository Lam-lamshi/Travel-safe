let next = document.querySelector(".next")
let prev = document.querySelector(".prev")
                    
                    next.addEventListener("click", function(){
                        let destination_items = document.querySelectorAll(".destination_items");
                        document.querySelector(".sliding").appendChild(destination_items[0])
                    })
                    prev.addEventListener("click", function(){
                        let destination_items = document.querySelectorAll(".destination_items");
                        document.querySelector(".sliding").prepend(destination_items[destination_items.length-1])
                    })
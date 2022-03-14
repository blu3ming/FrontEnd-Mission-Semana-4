const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeInput");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    /*programacion Asincrona con promesas */
    fetch(url).then((res) => {
        if(res.status != "200"){
            //Si no encuentra el pokemon, devuelve gif por defecto
            pokeImage("images/sad-pikachu.gif");
            //Especifica como nombre de pokemon "Not found"
            cambiarNombrepokemon("Not found");
            //El fondo de deja en blanco por no haber tipo
            fondoPorTipo("None");
            //Se deja en blanco el tipo
            cambiarTipopokemon("","");
            //Y se deja en blanco las stats
            agregarHabilidades("","","","","","");
        } else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        //Obtenemos la imagen
        let pokeImg = data.sprites.front_default;
        //El nombre
        let nombre = data.name;
        //El total de tipos a los que pertenece el pokemon
        let num_tipos = data.types.length
        //Para así crear una lista con todos ellos
        let tipos = "";
        //Recorremos los tipos para obtenerlos todos
        for(let i = 0; i < num_tipos; i++){
            if(i == 0){
                //Empleando el primero que encuentre para el color de fondo
                tipos += capitalizar(data.types[i].type.name);
                tipo_para_color = capitalizar(data.types[i].type.name);
            }
            //Y los demás con la coma para separar
            else{tipos += ", " + capitalizar(data.types[i].type.name);}
        }
        //Mandamos a colocar la primera letra del nombre en mayúscula
        let nombre2 = capitalizar(nombre);
        //Completamos el nombre con el numero del pokemon
        let nombre_completo = "#" + data.order + ": " + nombre2;
        //Obtenemos las stats
        let hp = data.stats[0].base_stat;
        let attack = data.stats[1].base_stat;
        let defense = data.stats[2].base_stat;
        let spattack = data.stats[3].base_stat;
        let spdefense = data.stats[4].base_stat;
        let speed = data.stats[5].base_stat;
        //Seteamos foto, nombre, tipo y stats
        pokeImage(pokeImg);
        cambiarNombrepokemon(nombre_completo);
        cambiarTipopokemon(tipos,tipo_para_color);
        agregarHabilidades(hp,attack,defense,spattack,spdefense,speed);
    })
}

//Setea la imagen del pokemon
const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

//Setea el nombre del pokemon con su numero
const cambiarNombrepokemon = (nombre) => {
    const pokeName = document.getElementById("nombre-pokemon");
    pokeName.textContent = nombre;
}

//Setea el o los tipos a los que pertenece junto con el color de fondo
const cambiarTipopokemon = (tipos, color) => {
    const pokeTipo = document.getElementById("tipoPokemon");
    pokeTipo.textContent = "Type: " + tipos;
    //Setea el color de fondo con el primer tipo del pokemon
    //A menos que no exista, en ese caso, no se coloca ya que anteriormente se seteo en blanco (l. 13)
    if (tipos != ""){fondoPorTipo(color);}
}

//Funcion que solo pone la primera letra de la palabra recibida en mayúscula
const capitalizar = (palabra) => {
    const arr = palabra.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const nombre2 = arr.join(" ");
    return nombre2;
}

//Dependiendo del tipo de pokemon, cambia el color de fondo
const fondoPorTipo = (tipo) => {
    console.log(tipo);
    const fondoTipo = document.getElementById("info");
    if(tipo == "Normal"){fondoTipo.style.backgroundColor = "#a8a878";}
    else if(tipo == "Fire"){fondoTipo.style.backgroundColor = "#f08030";}
    else if(tipo == "Water"){fondoTipo.style.backgroundColor = "#6890f0";}
    else if(tipo == "Grass"){fondoTipo.style.backgroundColor = "#78c850";}
    else if(tipo == "Electric"){fondoTipo.style.backgroundColor = "#f8d030";}
    else if(tipo == "Ice"){fondoTipo.style.backgroundColor = "#98d8d8";}
    else if(tipo == "Fighting"){fondoTipo.style.backgroundColor = "#c03028";}
    else if(tipo == "Poison"){fondoTipo.style.backgroundColor = "#a040a0";}
    else if(tipo == "Ground"){fondoTipo.style.backgroundColor = "#e0c068";}
    else if(tipo == "Flying"){fondoTipo.style.backgroundColor = "#a890f0";}
    else if(tipo == "Psychic"){fondoTipo.style.backgroundColor = "#f85888";}
    else if(tipo == "Bug"){fondoTipo.style.backgroundColor = "#a8b820";}
    else if(tipo == "Rock"){fondoTipo.style.backgroundColor = "#b8a038";}
    else if(tipo == "Ghost"){fondoTipo.style.backgroundColor = "#705898";}
    else if(tipo == "Dark"){fondoTipo.style.backgroundColor = "#705848";}
    else if(tipo == "Dragon"){fondoTipo.style.backgroundColor = "#7038f8";}
    else if(tipo == "Steel"){fondoTipo.style.backgroundColor = "#b8b8d0";}
    //Para cuando no encuentra el pokemon
    else if(tipo == "None"){fondoTipo.style.backgroundColor = "#ffff";}
    else{fondoTipo.style.backgroundColor = "#f0b6bc";}
}

//Setea habilidades
const agregarHabilidades = (hp,attack,defense,spattack,spdefense,speed) => {
    let hpDom = document.getElementById("hp");
    let attackDom = document.getElementById("attack");
    let defenseDom = document.getElementById("defense");
    let spatkDom = document.getElementById("sp-attack");
    let spdefDom = document.getElementById("sp-defense");
    let speedDom = document.getElementById("speed");
    hpDom.textContent = "HP: " + hp;
    attackDom.textContent = "Attack: " + attack;
    defenseDom.textContent = "Defense: " + defense;
    spatkDom.textContent = "SP-Attk: " + spattack;
    spdefDom.textContent = "SP-Def: " + spdefense;
    speedDom.textContent = "Speed: " + speed;
}
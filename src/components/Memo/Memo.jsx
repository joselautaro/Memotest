import React, {useState, useEffect} from 'react'
import {BsFillQuestionCircleFill} from 'react-icons/bs'
import Swal from 'sweetalert2'

export const Memo = () => {


    const symbols = ["Uno", "Dos","Tres", "Cuatro", "Cinco", "Seis"]

    // Definimos los estados iniciales de las cartas

    const [cards, setCards] = useState([])

    const [flippedCards, setFlippedCards] = useState([])

    const [matchedCards, setMatchedCards] = useState([])

    // useEffect(() =>{
    //     // Generamos las cartas duplicando los símbolos y asignándoles un id
    //     const generatedCards = symbols.concat(symbols).map((symbol, index) =>({
    //         id: index,
    //         symbol: symbol,
    //         isFlipped: false, //Todas las cartas estan boca abajo al principio
    //         isMatched: false //Ninguna carta está emperejada al principio
    //     }))
        
    //     setCards(generatedCards) //Guardamos cartas en el estado
    // }, [])
    useEffect(() => {
        // Generamos las cartas duplicando los símbolos y asignándoles un id
        
        const generatedCards = symbols.concat(symbols).map((symbol, index) =>({
                    id: index,
                    symbol: symbol,
                    isFlipped: false, //Todas las cartas estan boca abajo al principio
                    isMatched: false //Ninguna carta está emperejada al principio
                }))
    
        // Orden aleatorio de las cartas
        const shuffledCards = generatedCards.sort(() => Math.random() - 0.5);
    
        setCards(shuffledCards);
      }, []);

    const handleCardClick = (card) =>{

        // Si la carta ya está volteada o coincide, no hacemos nada
        if(card.isFlipped || card.isMatched) return

        //Guardamos la carta volteada en un estado
        const newFlippedCards = [...flippedCards, card]
        setFlippedCards(newFlippedCards)

        //Si hay dos cartas volteadas, verificamos si son iguales
        if (newFlippedCards.length === 2){
            setTimeout(() =>{
                checkForMatch(newFlippedCards)
            }, 1000)
        }
    }

    const checkForMatch = (flippedCards) =>{

        //Obtenemos las cartas volteadas
        const [firstCard, secondCard] = flippedCards

        //Actualizamos las cartas volteadas en el estado
        const updatedCards = cards.map ((card) =>{
            if ( card.id === firstCard.id || card.id === secondCard.id){
                return {...card, isFlipped: true} //Volteamos las cartas que coinciden
            } else{
                return {...card, isFlipped: false}
            }
        })

        //Si las dos cartas volteadas tienen el mismo símbolo, las emperejamos
        if (firstCard.symbol === secondCard.symbol){
            setMatchedCards([...matchedCards, firstCard.id, secondCard.id])
        }
        
          

        //Limpiamos las cartas volteadas en el estado
        setFlippedCards([])

        //Si todas las cartas están enparejadas, mostramos un mensaje de victoria
        if(matchedCards.length + 2 === cards.length){
            setTimeout(() =>{
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicitaciones, lo lograste!',
                    showConfirmButton: false,
                  })
                
            }, 1000)
        }
       
          
        // Actualizamos las cartas en el estado
        setCards(updatedCards)

    }

    //Renderizamos una carta
    const renderCard = (card) =>{
        //Determinamos si la cart está volteada o emparejada

        const isFlipped = card.isFlipped || matchedCards.includes(card.id) || flippedCards.includes(card.id)
        const cardClass = `card${isFlipped ? 'flipped' : ''}`


        return (
            <div className={cardClass} key={card.id} onClick={() => handleCardClick(card)}>
                <div className='card-inner'>
                    
                    {
                        isFlipped ?
                        <div>{card.symbol}</div>
                        :
                        <div>
                            <BsFillQuestionCircleFill/>
                        </div>
                    }
                </div>
            </div>
        )

    }

  return (
    <div className='memotest'>
        <div className='board'>
            {
                cards.map((card) => renderCard(card))
            }
        </div>
    </div>
  )
}




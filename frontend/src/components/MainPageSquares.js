// import React, { useState, useEffect } from "react";
// import { Carousel } from "antd";
// import axios from "axios";

// function MainPageSquares() {
//     const [cards, setCards] = useState([]);

//     useEffect(() => {
//         // Fetch data from an API endpoint
//         axios.get("your_api_endpoint")
//             .then(response => {
//                 setCards(response.data); // Assuming the response.data is an array of card objects
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Calls Back Dynamic Fetches</h1>
//             <Carousel autoplay>
//                 {cards.map((card, index) => (
//                     <div key={index}>
//                         <img src={card.imageUrl} alt={`Card ${index}`} />
//                         <div>{card.description}</div>
//                     </div>
//                 ))}
//             </Carousel>
//         </div>
//     );
// }

import React from "react";
import { Carousel, Card, Row, Col } from "antd";

function MainPageSquares() {
    // Dummy data for cards
    const dummyCards = [
        { 
            images: [
                "https://via.placeholder.com/400",
                "https://via.placeholder.com/400",
                "https://via.placeholder.com/400"
            ], 
            header: "Header for card 1",
            description: "Description for card 1" 
        },
        { 
            images: [
                "https://via.placeholder.com/400",
                "https://via.placeholder.com/400",
                "https://via.placeholder.com/400"
            ], 
            header: "Header for card 2",
            description: "Description for card 2" 
        },
        // Add more cards as needed
    ];

    return (
        <div style={{ padding: '50px' }}>
            <h1 style={{ color: '#FFF' }}>Calls Back Dynamic Fetches</h1>
            <Row gutter={[16, 16]}>
                {dummyCards.map((card, index) => (
                    <Col span={8} key={index}>
                        <Card
                            title={card.header}
                            bordered={false}
                            style={{ margin: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', background: '#002140' }}
                        >
                            <Carousel autoplay>
                                {card.images.map((imageUrl, idx) => (
                                    <div key={idx}>
                                        <img src={imageUrl} alt="" style={{ width: '100%' }} />
                                    </div>
                                ))}
                            </Carousel>
                            <p>{card.description}</p>
                            <div style={{ background: '#002140', padding: '5px', textAlign: 'center' }}>
                                Hosted Box
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default MainPageSquares;


import React from 'react';
import Card from '../Card';
import Dialog from '../Dialog';

const CompanyScreen = (props) => {
    const [subscribed, setSubscribed] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState('');
    const [amount, setAmount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const slide = (func) => {
        let slider = document.getElementsByClassName('slide-container')[0]
        let cardLen = (window.innerWidth <= 1180) ?
                        0.5*window.innerWidth - 15 :
                        0.3333*window.innerWidth - 10;
        let change = (window.innerWidth <= 1180) ? 2: 3;
        let curCard = Math.round(slider.scrollLeft/cardLen);
        slider.scroll(cardLen * (func(curCard,change)),0);
    };

    const data = {
        companyName: 'Company Name',
        title: 'Title',
        description: 'This is a mock company page. You can subscribe to this company to become a stakeholder. You will be able to see the proposals and vote!',
        cards: [
            {
                title: 'Proposal 1',
                description: 'Thiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a as is a mock proposal. You can vote for this proposal to support it. ',
                status: null,
            },
            {
                title: 'Proposal 2',
                description: 'Thiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a as is a mock proposal. You can vote for this proposal to support it. Thiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa a as is a mock proposal. You can vote for this proposal to support ',
                status: 'rejected',
            },
            {
                title: 'Proposal 3',
                description: 'This is a mock proposal. You can vote for this proposal to support it.',
                status: 'approved',
            },
            {
                title: 'Proposal 4',
                description: 'This is a mock proposal. You can vote for this proposal to support it.',
                status: null,
            },{
                title: 'Proposal 5',
                description: 'This is a mock proposal. You can vote for this proposal to support it.',
                status: 'approved',
            },{
                title: 'Proposal 6',
                description: 'This is a mock proposal. You can vote for this proposal to support it.',
                status: 'approved',
            },
            {
                title: 'Proposal 7',
                description: 'This is a mock proposal. You can vote for this proposal to support it.',
                status: 'approved',
            },
        ]
    }

    const closeDialog = () => {
        if (!loading) {
            setOpen(false);
            setMessage('');
        }
    }
    const subscribe = () => {
        setMessage('');
        setLoading(true);
        // do api call
        //sleep for 10 sec
        setTimeout(()=>{
            setLoading(false);
            setSubscribed(true);
            setMessage('Successed!');
        },3000);
    }

    return (
        <div id="page-wrapper">
            <div id='header-wrapper'>
                <header className='container'>
                    <div id='logo'>
                        <h1><a href='#'>{data.companyName}</a></h1>
                    </div>
                </header>
            </div>
            <div id="main-wrapper">
                <div className='container'>
                    <article>
                        <h2>{data.title}</h2>
                        <p className="company-description">{data.description}</p>
                    </article>
                    <div id='subscription-wrapper'>
                        <div id='subscription-info'>
                            {!subscribed ? null : <h3>You have subscribed {} to this company.</h3>}
                        </div>
                        <button 
                            className='button' 
                            onClick={() => setOpen(true)}>
                            <span>{subscribed ? 'Subscribe More' : 'Become a Shareholder'}</span>
                        </button>
                    </div>
                </div>
            </div>
            { subscribed &&
            <div className='slider'>
                <button className='slide-prev button' onClick={()=>slide((a,b)=>a-b)}>&#8249;</button>
                <div className="slide-container rootClass" >
                    <div className="slide-content">
                        {data.cards.map((card,i) => <Card key={i} data={card}/>)}
                    </div>
                </div>
                <button className='slide-next button' onClick={()=>slide((a,b)=>a+b)}>&#8250;</button>
            </div>
            }
            <Dialog open={open} closeDialog={() => closeDialog()}>
                <section>
                    <div className='button-input-group'>
                        <div className='group input-group'>
                            <input
                                type="text"
                                placeholder="Key"
                                className='inputfield'
                                onChange={(e) => {setKey(e.target.value)}}
                            />
                        </div>
                        <div className='group input-group'>
                            <input
                                type="number"
                                placeholder="Amount"
                                className='inputfield'
                                onChange={(e) => {setAmount(e.target.value)}}
                            />
                        </div>
                        <div className='group button-group'>
                            {loading ? <div className="loader"/>
                            : <button onClick={subscribe}>Subscribe</button>}
                            {(!loading) && message ? <p>{message}</p> : null}
                        </div>
                    </div>
                </section>
            </Dialog>
        </div>
    );
};

export default CompanyScreen;
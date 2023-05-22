import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Context = createContext();

export const TelegramContext = ({ children }) => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/users').then(response => response.json())
            .then(contacts => setContacts(contacts))
    }, []);

    const [showContact, setShowContact] = useState([]);
    const [contactIM, setContactIM] = useState([]);

    const showHeaderContact = (id) => {
        setShowContact([contacts.find(contact => contact.id === id)])
        setContactIM([contacts.find(contact => contact.id !== id)])
    }
    const [choosenContact, setChoosenContact] = useState();

    const [shoose, setShoose] = useState(false);
    const onContactClick = (id) => {
        setChoosenContact(contacts.find((contact) => contact.id === id))
    }
    const selectShoose = () => {
        setShoose(true)
    }

    const [contactsForSearch, setContactsForSearch] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3001/contacts')
            .then(response => response.json())
            .then(contacts => setContactsForSearch(contacts))
    }, [])
    const concatContacts = [...contacts, ...contactsForSearch];

    const [filterContacts, setFilterContacts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/users')
            .then(response => response.json())
            .then(contacts => setFilterContacts(contacts))
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        if (value !== '') {
            const filteredContacts = concatContacts.filter(contact => contact.firstName.toLowerCase().includes(value));
            setFilterContacts(filteredContacts)
        } else {
            const filteredContacts = contacts.filter(contact => contact.firstName.toLowerCase().includes(value));
            setFilterContacts(filteredContacts)
        }
    }

    const [showMenuBurger, setShowMenuBurger] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);

    // MessegeBox

    const [messages, setMessages] = useState([]);

    const [getContacts, setGetContacts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:3001/users')
            .then(response => response.json())
            .then(user => setGetContacts(user))
    }, [messages])

    const findContactForFilterMessages = contacts.find(contact => (choosenContact !== undefined)
        && contact.id !== choosenContact.id
    );

    useEffect(() => {
        if (!choosenContact) return;
        getMessages()
    }, [choosenContact])


    const [showSearchMesseges, setShowSeachMessages] = useState(false);
    const [showAboutContact, setShowAboutContact] = useState(false);
    // MessageList 

    const contactImg = showContact && showContact.map(contact => contact.img);

    const [editingMessageId, setEditingMessageId] = useState(null);
    const handleUpdateMessage = (updatedMessage) => {
        const messege = messages.find((message) => message.id === updatedMessage.id);
        if (messege.id >= 0) {
            const updatedMessages = [...messages];
            updatedMessages[messege.id] = updatedMessage;
            setMessages(updatedMessages);
        }
        setEditingMessageId(null);
        getMessages();
    };
    const deleteMessage = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/delete-messages/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setMessages(messages.filter(message => message.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
        getMessages()
    };

    const bgDark = useSelector(state => state.toolkit.bgDark);
    const mListStyle = ['h-[80vh] px-4 py-3 w-[100%] overflow-auto']
    const darkModeStyle = bgDark ? 'bg-black/70 text-white border px-4 py-1 rounded-xl mb-2' : 'border bg-white px-4 py-1 rounded-xl mb-2';

    // MessageInput 
    const [emojiVisible, setEmojiVisible] = useState(false);
    const [emojiSelect, setEmojiSelect] = useState(null);

    const [newMessage, setNewMessege] = useState({
        text: '',
    });


    const getMessages = () => {
        fetch(`http://127.0.0.1:3001/message-user/${findContactForFilterMessages.id}/${choosenContact.id}`)
            .then(response => response.json())
            .then(messages => setMessages(messages))
    }

    const addNewMessage = (e) => {
        e.preventDefault();
        if (newMessage.text !== "") {
            fetch('http://127.0.0.1:3001/create-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            })
                .then(response => response.json())
                .then(data => getMessages())
                .catch(error => console.error(error))
            setNewMessege({
                text: '',
                date: ''
            });
            setEmojiSelect(null);
        }
    }

    const handleChange = (e) => {
        setNewMessege({
            ...newMessage, id: crypto.randomUUID(),
            text: e.target.value,
            senderId: findContactForFilterMessages.id,
            receiverId: choosenContact.id,
            emoji: emojiSelect,
            date: moment().format('LT')
        });
    }

    const darkModeStyleMessageInput = bgDark ? 'bg-black/90 text-white' : 'bg-gray-200';
    const microStyle = ['px-4 py-4  rounded-full', darkModeStyle].join(' ')
    const inputMessageStyle = ['border border-gray-500 w-[90%] flex items-center gap-3 h-[100%] rounded-2xl px-2', darkModeStyle];

    const value = {
        contacts, setContacts,
        showContact, setShowContact,
        showHeaderContact,
        choosenContact, setChoosenContact,
        shoose, setShoose,
        onContactClick,
        selectShoose,
        contactsForSearch,
        concatContacts,
        filterContacts,
        setFilterContacts, handleSearch,
        showMenuBurger, setShowMenuBurger,
        loggedIn, setLoggedIn,
        // MessegeBox
        messages, setMessages,
        getContacts, setGetContacts,
        showSearchMesseges, setShowSeachMessages,
        showAboutContact, setShowAboutContact,
        // MessageList 
        contactImg, editingMessageId, setEditingMessageId, handleUpdateMessage,
        deleteMessage, bgDark, mListStyle, darkModeStyle,
        contactIM,
        // MessageInput
        emojiVisible, setEmojiVisible,
        emojiSelect, setEmojiSelect,
        newMessage, setNewMessege,
        addNewMessage, handleChange, darkModeStyleMessageInput,
        microStyle, inputMessageStyle
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}
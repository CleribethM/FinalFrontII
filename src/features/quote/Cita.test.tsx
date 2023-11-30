import { rest } from "msw";
import { setupServer } from "msw/node";
import {  fireEvent, screen, waitFor } from "@testing-library/react"
import { render } from "../../test-utils"
import Cita from "./Cita"
import  userEvent  from "@testing-library/user-event"
import { API_URL } from "../../app/constants";



const mockedData = [
    {   
        query:'homer',
        data: {
            quote: "I hope I didn't brain my damage.",
            character: "Homer Simpson",
            image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
            characterDirection: "Right"
        },
    },
    {   
        query:'bart',
       data:{
            "quote": "Nothing you say can upset us. We're the MTV generation.",
            "character": "Bart Simpson",
            "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FBartSimpson.png?1497567511638",
            "characterDirection": "Right"
        },
    },
    {
        query: 'marge',
        data: {
            "quote": "I don't want to sound like a killjoy, but becuase this is not to my taste I don't think anyone else should be allowed to enjoy it.",
            "character": "Marge Simpson",
            "image": "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMargeSimpson.png?1497567512205",
            "characterDirection": "Right"
        },
    }

]

const validQueries = mockedData.map((q)=>q.query)

const handlers = [
    rest.get(`${API_URL}`, (req, res, ctx) => {
      const character = req.url.searchParams.get('character');
  
      if (character === null) {
        return res(ctx.json([mockedData[2].data]), ctx.delay(150));
      }
  
      if (validQueries.includes(character)) {
        const quote = mockedData.find((q) => q.query === character);
        return res(ctx.json([quote?.data]));
      }
  
      return res(ctx.json([]), ctx.delay(150));
    }),
  ];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const renderComponent = () => render(<Cita />);


describe("Cita", ()=>{    
    describe("renderizado inicial", ()=>{  
        it("Se renderiza el texto No se encontro ninguna cita", ()=>{ 
            renderComponent()
            const text = screen.getByText("No se encontro ninguna cita")
            expect(text).toBeInTheDocument();
        })       
        it("Se renderiza el input: Ingresa el nombre del autor", ()=>{           
            renderComponent()
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            expect(inputText).toBeInTheDocument();
        })
        it("se renderiza el boton Obtener cita aleatoria", ()=>{
            renderComponent()
            const botonBuscar = screen.getByText(/obtener cita aleatoria/i)
            expect (botonBuscar).toBeInTheDocument()
        })
        it("se renderiza el boton Borrar", ()=>{           
            renderComponent()
            const botonBorrar = screen.getByText(/borrar/i)
            expect (botonBorrar).toBeInTheDocument()
        })
    })
    describe(("cambio de texto en boton obtener"), ()=>{       
        it("Ingresando un texto al input se muestra el texto Obtener Cita", async ()=>{           
            renderComponent()
            const inputText = await screen.findByPlaceholderText("Ingresa el nombre del autor")
            //screen.debug()
            await userEvent.clear(inputText);  
            fireEvent.change(inputText, { target: { value: 'homer' } });
            await waitFor(()=>{
                //screen.debug()
                expect (screen.queryByText(/obtener cita aleatoria/i)).not.toBeInTheDocument()
            })
        })
    })

   describe("Ingresando un valor numerico al input", () => {         
        it("se debe mostrar el mensaje Por favor ingrese un nombre válido", async () => {           
           renderComponent();
            const inputText = await screen.findByPlaceholderText('Ingresa el nombre del autor')
            fireEvent.change(inputText, { target: { value: '5' } })           
            const botonBuscar = screen.getByRole("button", {name:/obtener cita/i})
            userEvent.click(botonBuscar);
             await waitFor(()=>{
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
               
           })
            
        })      
    })

    describe("Boton borrar", ()=>{
        it("al presionar boton borrar se renderiza: No se encontro ninguna cita, en el input: Ingresa el nombre del autor y en el boton Obtener cita aleatoria", async () =>{
            renderComponent()
            const inputText = await screen.findByPlaceholderText(/Ingresa el nombre del autor/i)
            const botonBuscar = await screen.findByLabelText(/obtener cita aleatoria/i)
            await userEvent.clear(inputText);
            userEvent.type(inputText ,'Bart');
            userEvent.click(botonBuscar);
           // screen.debug()
            const botonBorrar = await screen.findByLabelText(/borrar/i)
            userEvent.click(botonBorrar);
           // screen.debug()
            await waitFor(() =>{
            expect ( screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument()
            })
        })
    })
    
    describe("Cuando la query se esta ejecutando", () => {
        it("Deberia mostrar el mensaje de cargando", async () => {
            renderComponent()
            const botonBuscar = await screen.findByLabelText(/obtener cita aleatoria/i)
            userEvent.click(botonBuscar);
            await waitFor(() =>{
                // screen.debug()
                expect (screen.getByText(/cargando/i)).toBeInTheDocument()                
            })
        });
        
        it('Se renderiza cita al azar', async()=>{
            renderComponent()
            // const botonBuscar = await screen.findByLabelText(/obtener cita aleatoria/i)
            const botonBuscar = screen.getByRole("button", {name : /obtener cita aleatoria/i})
            userEvent.click(botonBuscar);
            await waitFor(() =>{
            //  screen.debug()
              expect(screen.getByText(/I don't want to sound like a killjoy/i)).toBeInTheDocument();
            })
         })

         it('Se renderiza cita del personaje ingresado', async()=>{
            renderComponent()
            const inputText = await screen.findByPlaceholderText(/Ingresa el nombre del autor/i)
            const botonBuscar = await screen.findByLabelText(/obtener cita/i)            
            await userEvent.clear(inputText);
            await userEvent.type(inputText, "homer")            
            userEvent.click(botonBuscar);
            await waitFor(() =>{            
              expect(screen.getByText(/I hope I didn't brain my damage./i)).toBeInTheDocument();
            })
         })

         it("Se ingresa un personaje inexistente", async ()=>{
            const personaje = "rick"           
            renderComponent();
            const inputText = await screen.findByPlaceholderText(/Ingresa el nombre del autor/i)
            fireEvent.change(inputText, { target: { value: personaje } })           
            const botonBuscar = screen.getByRole("button", {name:/obtener cita/i})
            userEvent.click(botonBuscar);  
            // screen.debug()           
            await waitFor(() =>{                          
                expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeInTheDocument();
              })
         })
        
    })   
})
from enum import Enum
from users import users
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserNames(str, Enum):
    Eua = "Eua"
    Jack = "Jack"
    John = "John"
    Hwa_Ryun = "Hwa_Ryun"
    Makima = "Makima"
 
@app.get("/")
async def root():
    return{"message": "Hello World"}

@app.get("/users")
async def get_users():
    return{"users": users}

@app.get("/users/{user_id}")
async def get_item(user_id: int):
    return{"user_id": user_id}

@app.get("/users/names/{name}")
async def get_users_names(name: UserNames):
    return{"name" : name}

@app.get("/signup")
async def signup(username: str, password: str):
    return {"username": username, "password": password}

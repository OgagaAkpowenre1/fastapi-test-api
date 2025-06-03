from enum import Enum
from users import users
from fastapi import FastAPI

app = FastAPI()

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
    # if name is UserNames.Eua:
    #     return {"Name": UserNames.Eua.value}
    # elif name is UserNames.Jack:
    #     return {"Name": UserNames.Jack.value}
    # elif name is UserNames.John:
    #     return {"Name": UserNames.John.value}
    # elif name is UserNames.Hwa_Ryun:
    #     return {"Name": UserNames.Hwa_Ryun.value}
    # elif name is UserNames.Makima:
    #     return {"Name": UserNames.Makima.value}
    # else:
    #     return {"message": "User not found"}
    return{"name" : name}

from database import Base, engine
import models  # Make sure this imports User and Note classes

Base.metadata.create_all(bind=engine)

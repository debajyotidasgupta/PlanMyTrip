"""
Crude ORM implementation
"""
from flask_mysqldb import MySQL
from MySQLdb import escape_string

db = MySQL()


class Model:
    SCHEMA = {
        "id": "id INT PRIMARY KEY",
        "data": "data VARCHAR(255)"
    }
    
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            self.__dict__[k] = v
        

    @classmethod
    def createTable(cls):
        query = """CREATE TABLE {} (
            {}
        );""".format(cls.__name__, ",\n".join(cls.SCHEMA.values()))
        print(query)
        try:
            cursor = db.connection.cursor()
            cursor.execute(query)
        except Exception as e:
            print("Error:", e)


    @classmethod
    def dropTable(cls):
        query = """DROP TABLE {}""".format(cls.__name__)
        print(query)
        try:
            cursor = db.connection.cursor()
            cursor.execute(query)
        except Exception as e:
            print("Error:", e)


    def save(self):
        cols = []
        vals = []
        for k, v in self.SCHEMA.items():
            if k.startswith("!"):
                # Constraints
                continue
            try:
                vals.append(self.formatInput(self.__dict__[k], v))
                cols.append(k)
            except Exception:
                pass

        query = """INSERT INTO {} ({}) VALUES ({});
        COMMIT;
        """\
                .format(self.__class__.__name__,
                        ", ".join(cols),
                        ", ".join(vals))
        
        print(query)

        try:
            cursor = db.connection.cursor()
            cursor.execute(query)
        except Exception as e:
            print("Error:", e)

    
    @classmethod
    def update(cls, **kwargs):
        pairs = []
        for k, v in cls.SCHEMA.items():
            if k.startswith("!"):
                continue
            if k in kwargs:
                pairs.append("{} = {}".format(k, cls.formatInput(kwargs[k], v)))
        
        query = """UPDATE {} SET {}"""\
                .format(cls.__name__, ", ".join(pairs))

        if "where" in kwargs:
            query += """ WHERE {}""".format(str(kwargs["where"]))

        query += """; COMMIT;"""

        print(query)

        try:
            cursor = db.connection.cursor()
            cursor.execute(query)
        except Exception as e:
            print("Error:", e)


    @classmethod
    def delete(cls, where=None):
        query = """DELETE FROM {}""".format(cls.__name__)
        if where is not None:
            query += """ WHERE {}""".format(str(where))

        query += """; COMMIT;"""

        print(query)

        try:
            cursor = db.connection.cursor()
            cursor.execute(query)
        except Exception as e:
            print("Error:", e)


    def __repr__(self):
        return self.__class__.__name__ + "(" + str(self.__dict__) + ")"


    @staticmethod
    def formatInput(s, col):
        s = escape_string(s)
        if type(s) == bytes:
            s = s.decode()
        col = col.lower()
        if (" int" in col) or\
        (" float" in col) or\
        (" number" in col) or\
        (" decimal" in col):
            return str(s)
        else:
            return ('"' + str(s) + '"')


class Query(Model):
    def __init__(self, query, model=None):
        super().__init__()
        self.model = model
        self.query = query

    
    def getOne(self, *args):
        q = str(self.query).format(*args)
        print(q)

        try:
            cursor = db.connection.cursor()
            cursor.execute(q)
            row = cursor.fetchone()
            if row is None:
                return row
            if self.model is not None:
                row = self.model(**row)
            return row
        except Exception as e:
            print("Error:", e)


    def getAll(self, *args):
        q = str(self.query).format(*args)
        print(q)

        try:
            cursor = db.connection.cursor()
            cursor.execute(q)
            row = cursor.fetchall()
            if self.model is not None:
                row = [self.model(**a) for a in row]
            return row
        except Exception as e:
            print("Error:", e)


    def __repr__(self):
        return "Query(" + self.query + ")"



class Transaction(Model):
    def __init__(self, query, model=None):
        super().__init__()
        self.model = model

        if type(query) != list:
            query = [query]

        self.query = ["START TRANSACTION;"] + query + ["COMMIT"]

    def execute(self):
        q = "\n".join(self.query)
        print(q)
        try:
            cursor = db.connection.cursor()
            cursor.execute(q)
        except Exception as e:
            print("Error:", e)


    def __repr__(self):
        return "Transaction(" + "\n".join(self.query) + ")"
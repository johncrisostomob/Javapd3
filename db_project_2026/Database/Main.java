import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.sql.*;

import java.net.InetSocketAddress;
import java.util.Map;

//For compiling on the shell on repl: Same on mac
//javac -cp sqlite-jdbc-3.23.1.jar: Main.java
//java -cp sqlite-jdbc-3.23.1.jar: Main

//Use for windows
//javac -cp sqlite-jdbc-3.23.1.jar; Main.java
class Main {

 public static void main(String[] args)throws IOException{
    (new Main()).init();
  }


  void print(Object o){ System.out.println(o);}
  void printt(Object o){ System.out.print(o);}

  void init() throws IOException{
   

    // create a port - our Gateway
    int port = 8000;
      
    //create the HTTPserver object
    HttpServer server = HttpServer.create(new InetSocketAddress(port),0);

    // create the database object
    Database db = new Database("jdbc:sqlite:celebrities2.db");

    String sql = "SELECT * FROM Celebrities";
    
  // connects the 3 tables together and selects the name, age, net worth, career (info being pulled from database)
    sql = "SELECT Celebrities.name, Celebrities.age, Celebrities.netWorth, Careers.career, Gender.gender"
    + " FROM Celebrities"
    + " INNER JOIN Careers ON Celebrities.career_id = Careers.career_id"
    + " INNER JOIN Gender ON Celebrities.gender_id = Gender.gender_id"
    + " ORDER BY Celebrities.celeb_id";
    server.createContext("/", new RouteHandler("You are connected, but route not given or incorrect....") );
    server.createContext("/Celebrities", new RouteHandler(db,sql));

  
    //Start the server
    server.start();

    System.out.println("Server is listening on port "+port);
       
      
    }    
}



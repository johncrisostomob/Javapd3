import com.sun.net.httpserver.HttpContext;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.sql.*;
import java.net.InetSocketAddress;
import java.util.Map;

/*
In order to communicate with the DB server from a browser tab, you will need to append the route name to the url
Available routes:
- http://localhost:8500/games - All games
- http://localhost:8500/genres - All genres
- http://localhost:8500/platforms - All unique platforms
- http://localhost:8500/full - Games with genre information

This code uses your existing Database.java and RouteHandler.java files
*/
class Main {
    public static void main(String[] args) throws IOException {
        (new Main()).init();
    }
    
    void print(Object o) { 
        System.out.println(o);
    }
    
    void printt(Object o) { 
        System.out.print(o);
    }
    
    void init() throws IOException {   
        // Create a port - this is your Gateway
        int port = 8500;
        // Create the HTTPserver object
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        // Create the database object using your existing Database.java
        Database db = new Database("jdbc:sqlite:games_database.sqlite");
        
        // Create a route handler to respond to the request (default route)
        server.createContext("/", new RouteHandler("Defualt route. . ."));
        
        // Create a route called 'games' that gets all games records
        String sql = "SELECT * FROM games ORDER BY title";
        server.createContext("/games", new RouteHandler(db, sql));
        
        // Create a route called 'genres' that gets all genres records
        sql = "SELECT * FROM genres ORDER BY name";
        server.createContext("/genres", new RouteHandler(db, sql));
        
        // Create a route called 'platforms' that gets all unique platforms
        sql = "SELECT DISTINCT platform FROM games ORDER BY platform";
        server.createContext("/platforms", new RouteHandler(db, sql));
        
        // Create a route called 'full' that gets all games with genre information
        sql = "SELECT games.id, games.title, games.genre_id, games.platform_id, games.release_year, games.rating, games.price, games.developer, games.publisher, games.description, genres.name as genre_name, genres.description as genre_description, platforms.name as platform " +
			  "FROM games " +
    		  "INNER JOIN genres ON games.genre_id = genres.id " +
    		  "INNER JOIN platforms ON games.platform_id = platforms.id " +
    		  "ORDER BY games.title";
        server.createContext("/full", new RouteHandler(db, sql));
        
        // Start the server      
        server.start();
		System.out.println("Server is listening on port " + port); 
    }    
}
class Main {
  public static void main(String[] args) {
    (new Main()).init();
  }
  void print(Object o){ System.out.println(o);}
  void printt(Object o){ System.out.print(o);}

  void init(){

    char[] sub = new char[18];
    sub[0] = 'a';
    sub[1] = 'b';
    sub[2] = 'd';
    sub[3] = 'e';
    sub[4] = 'g';
    sub[5] = 'i';
    sub[6] = 'k';
    sub[7] = 'l';
    sub[8] = 'm';
    sub[9] = 'n';
    sub[10] = 'o';
    sub[11] = 'p';
    sub[12] = 'r';
    sub[13] = 's';
    sub[14] = 't';
    sub[15] = 'u';
    sub[16] = 'x';
    sub[17] = 'z';


    char[] sub2 = new char[18];
    sub2[0] = 'α';  
    sub2[1] = 'β';    
    sub2[2] = 'δ';  
    sub2[3] = 'ε';
    sub2[4] = 'γ';
    sub2[5] = 'ι';
    sub2[6] = 'κ';
    sub2[7] = 'λ';
    sub2[8] = 'μ';
    sub2[9] = 'ν';
    sub2[10] = 'ο';
    sub2[11] = 'π';
    sub2[12] = 'ρ';
    sub2[13] = 'σ';
    sub2[14] = 'τ';
    sub2[15] = 'υ';
    sub2[16] = 'ξ';
    sub2[17] = 'ζ';

    
    // Encoding message
    String file = Input.readFile("Original.txt");

    //substituion
    String encodedMsg1 = subEncryption(file,sub,sub2);
    Input.writeFile("Encode1.txt",encodedMsg1);

    String encodedMsg2 = encode(encodedMsg1);
    Input.writeFile("Encode2.txt",encodedMsg2);

    String encodedMsg3 = reverse(encodedMsg2);
    Input.writeFile("Encode3.txt",encodedMsg3);

    
    // decoding message
    String file2 = Input.readFile("Encode1.txt");
    
    String decodedMsg1 = reverse(file2);
    Input.writeFile("Decode1.txt", decodedMsg1);
    
    String decodedMsg2 = decode(decodedMsg1);
    Input.writeFile("Decode2.txt", decodedMsg2);
    
    String decodedMsg3 = subEncryption(decodedMsg2, sub2, sub);
    Input.writeFile("Decode1.txt", decodedMsg3);
    
    
  }
  // Level 1 reverse string
  String reverse(String txt){
    String bld ="";
    for(int x=0; x<= txt.length()-1; x++){
      bld = txt.charAt(x) + bld;
    }
    return bld;
  }
  
  
  //Level 2 Cipher encoding with no wrapping
  String encode(String txt){
    String bld="";
    int ascii;
    char ch='\0';
    for(int x=0; x<=txt.length()-1; x++){
      ch=txt.charAt(x);
      ascii=(int)ch;

      if(ascii == 176){
        ascii = 75;
      }
      else if( ascii == 254){
        ascii = 188;
      }
      else{
        ascii+=3;
      }
      bld += (char)ascii;
    }
     
    return bld;
  }


  String decode(String txt){
    String bld="";
    int ascii;
    char ch='\0';
    for(int x=0; x<=txt.length()-1;x++){
      ch=txt.charAt(x);
      ascii=(int)ch;

      if(ascii == 75){
        ascii = 176;
      }
      else if( ascii == 188){
        ascii = 254;
      }
      else{
        ascii-=3;
      }
      bld += (char)ascii;
    }
   
    return bld;
  }

  // Level 3 Substituion encoding
  String subEncryption(String s, char[] sub, char[] sub2){
    String bld="";
    char ch ='\0';
    int index=0;
    for(int x=0; x<=s.length()-1; x++){
      ch=s.charAt(x);
      index=indexOf(ch,sub);
      if(index!=-1){
        bld+=sub2[index];
      }
      else{
        bld+=ch;
      }
    }
   
    return bld;
  }

  int indexOf(char ch, char[] arry){
    for(int x=0; x<=arry.length-1; x++){
      if(arry[x]==ch){
        return x;
      }
    }
    return -1;
  }
  int randInt(int lower, int upper){
    int range = upper - lower;
    return (int)(Math.random()*range+lower);
  }

}
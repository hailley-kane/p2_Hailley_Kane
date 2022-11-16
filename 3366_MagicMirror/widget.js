class Widget
{
    constructor ( x, y, w, h )
    {
        this.dragging = false;
        this.rollover = false;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        createGraphics( this.x, this.y );
        /* draggable
        1. is mouse is over object
        2. is mouse button clicked while on shape
        3. if mouse is moving while 1 and 2 are true
        4. if mouse button released, release shape at released position
        
        */
        var textWidth;
    }

    getData(url, func)
    {
        loadJSON( url, func );
    }

    addBoldText ( string, x, y )
    {
        push();
        textWidth = this.x + this.w / 25;
        fill( 0 );
        stroke( 0 );
        strokeWeight( 1 );
        textSize(this.area);
        textAlign( LEFT );
        text( string, textWidth + x, this.y + this.h / 25 + y, this.w, this.h );
        //text( string, this.x, this.y, this.w, this.h );
        textWrap( WORD );
        pop();
    }

    addCenterText ( string, fontsize )
    {
        push();
        fill( 0 );
        stroke( 0 );
        strokeWeight( .75 );
        textSize( fontsize );
        textAlign( CENTER );
        text( string, this.x, this.y + this.h / 2.5, this.w, this.h );
        textWrap( WORD );
        pop();
    }

    addTextPos ( string, x, y, fontsize )
    {
        push();
        textWidth = this.x + this.w / 25;
        fill( 0 );
        stroke( 0 );
        strokeWeight( .5 );
        textAlign( LEFT );
        textSize( fontsize );
        text( string, textWidth + x, this.y + y, this.w - 15, this.h );
        pop();
    }

    over ()
    {
        // Is mouse over object
        if ( mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h )
        {
            this.rollover = true;
        } else
        {
            this.rollover = false;
        }
    }

    update ()
    {
        // Adjust location if being dragged
        if ( this.dragging )
        {
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }

    show ()
    {
        push();
        stroke( 120, 50 );
        // Different fill based on state
        if ( this.dragging )
        {
            fill( 120 , 50);
        } else if ( this.rollover )
        {
            fill( 180, 50 );
        } else
        {
            fill( 0, 0 );
        }
        rect( this.x, this.y, this.w, this.h );
        pop();
    }

    pressed ()
    {
        // Did I click on the rectangle?
        if ( mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h )
        {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - mouseX;
            this.offsetY = this.y - mouseY;
        }
    }

    released ()
    {
        // Quit dragging
        this.dragging = false;
    }

    


}
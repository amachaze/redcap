<?php

class DesignController extends Controller
{
    // Return 1 or 0 if a given field is designed on multiple events or exists on a repeating instrument or event
    public function fieldUsedInMultiplePlaces()
    {
        print Design::fieldUsedInMultiplePlaces() ? '1' : '0';
    }

}
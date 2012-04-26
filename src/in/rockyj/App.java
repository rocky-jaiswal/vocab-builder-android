package in.rockyj;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class App extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}


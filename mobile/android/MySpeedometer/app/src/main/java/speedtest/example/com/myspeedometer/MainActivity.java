package speedtest.example.com.myspeedometer;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Date;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {
    LocationManager locManager;
    LocationListener li;
    TextView helloTextView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        helloTextView = findViewById(R.id.text_view_id);
        helloTextView.setText("Hello Rennay");


        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            helloTextView.setText("Permission is not granted...");
        }

        locManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        li = new speed();
        if (locManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
            locManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, li);
        }
        if (locManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
            locManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 2, li);
        }
    }

    class speed implements LocationListener{
        @Override
        public void onLocationChanged(Location loc) {
            Float thespeed=loc.getSpeed();
            String output = "";

            float speedInMeterPerSec = loc.getSpeed();
            float speedInKMPerSec = (speedInMeterPerSec * 60 * 60) / 1000;

            Date timestamp = new java.util.Date();

            output += "Speed (m/s): " + speedInMeterPerSec + "\n";
            output += "Speed (km/h): " + speedInKMPerSec + "\n";
            output += "Altitude: " + loc.getAltitude() + "\n";
            output += "Latitude: " + loc.getLatitude() + "\n";
            output += "Longitude: " + loc.getLongitude() + "\n";
            output += "Provider: " + loc.getProvider() + "\n";
            output += "GPS Time: " + loc.getTime() + "\n";
            output += "Time: " + timestamp + "\n";
            helloTextView.setText(output);
        }
        @Override
        public void onProviderDisabled(String arg0) {
            Toast.makeText(MainActivity.this,"onProviderDisabled", Toast.LENGTH_LONG).show();
        }
        @Override
        public void onProviderEnabled(String arg0) {
            Toast.makeText(MainActivity.this,"onProviderEnabled", Toast.LENGTH_LONG).show();
        }
        @Override
        public void onStatusChanged(String arg0, int arg1, Bundle arg2) {
            Toast.makeText(MainActivity.this,"onStatusChanged", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

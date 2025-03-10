import React from "react";

function Footer() {
    return (
      <div>
        <div className="text-left mt-12">
            <section className="text">
                <h2 className="text-xl font-bold">
                    Welcome to <br /> SMART BARTER EXCHANGE
                </h2>
                <p className="text-lg mt-2">
                    Trade and shop local with people in your city. Find things you love
                    like <br /> clothing, furniture, art and more.
                </p>
            </section>
        </div>

        <div className="text-right mt-12">
          <section className="mt-12">
                <h2 className="text-xl font-bold">CONTACT US</h2>
                <div className="mt-4">
                    <p>
                        <strong>Email</strong> <br /> eieieiei@lovegene.com
                    </p>
                    <p>
                        <strong>Phone</strong> <br /> +66 846131 451
                    </p>
                    <p>
                        <strong>Address</strong> <br /> Thrifted Ltd, 3 Cliffside Trade
                        <br /> Park, Motherwell Way, Grays,
                        <br /> RM20 3XD
                    </p>
                </div>
            </section>
        </div>
      </div>
    );
}

export default Footer;
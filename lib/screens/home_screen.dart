import '../widgets/search_box.dart';
import '../widgets/product_grid.dart';
import 'package:flutter/material.dart';
import '../widgets/news_carousel.dart';
import '../widgets/custom_bottom_nav.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(height: 20),
            SearchBox(),
            SizedBox(height: 20),
            NewsCarousel(),
            SizedBox(height: 20),
            Expanded(
              child: ProductGrid(),
            ),
          ],
        ),
      ),
      bottomNavigationBar: CustomBottomNav(),
    );
  }
}

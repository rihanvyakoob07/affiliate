import '../widgets/search_box.dart';
import '../widgets/product_grid.dart';
import 'package:flutter/material.dart';
import '../widgets/news_carousel.dart';
import '../widgets/custom_bottom_nav.dart';
import 'package:amazon_deals_uae/screens/category_screen.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Custom app bar with menu and notification icons - keep this fixed
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 0, 8, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Menu icon at the left
                  IconButton(
                    icon: const FaIcon(
                      FontAwesomeIcons.bars,
                      size: 16,
                    ),
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    onPressed: () {
                      // Add your menu functionality here
                    },
                  ),
                  IconButton(
                    icon: const FaIcon(
                      FontAwesomeIcons.bell,
                      color: Colors.grey,
                    ),
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    onPressed: () {
                      // Add your notification functionality here
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 8),
            // Search box - keep this fixed too
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 8),
              child: SearchBox(),
            ),

            const SizedBox(height: 16),

            // Make all the content below this scrollable
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const SizedBox(height: 0),
                    const NewsCarousel(),
                    const SizedBox(height: 16),
                    const CategorySection(),
                    const SizedBox(height: 16),

                    // Using a fixed height for ProductGrid instead of Expanded
                    // This allows it to be inside a ScrollView
                    Container(
                      constraints: const BoxConstraints(minHeight: 500),
                      child: const ProductGrid(),
                    ),

                    // Add some bottom padding to ensure last items are visible
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const CustomBottomNav(),
    );
  }
}
